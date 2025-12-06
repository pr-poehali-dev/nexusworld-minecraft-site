import json
from typing import Dict, Any
import socket
import struct

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает статус Minecraft сервера в реальном времени
    Args: event - содержит httpMethod, queryStringParameters
          context - объект с request_id и другими атрибутами
    Returns: JSON с данными о сервере (онлайн, игроки, версия)
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    server_host = 'NexusWorld.joinserver.ru'
    server_port = 25565
    
    try:
        server_data = get_server_status(server_host, server_port)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            'body': json.dumps(server_data),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': False,
                'error': str(e),
                'host': server_host,
                'port': server_port
            }),
            'isBase64Encoded': False
        }

def get_server_status(host: str, port: int, timeout: int = 3) -> Dict[str, Any]:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    try:
        sock.connect((host, port))
        
        handshake = create_handshake_packet(host, port)
        sock.sendall(handshake)
        
        status_request = b'\x01\x00'
        sock.sendall(status_request)
        
        response_length = read_varint(sock)
        packet_id = read_varint(sock)
        
        if packet_id != 0:
            raise ValueError(f'Invalid packet ID: {packet_id}')
        
        json_length = read_varint(sock)
        json_data = sock.recv(json_length).decode('utf-8')
        
        server_info = json.loads(json_data)
        
        return {
            'online': True,
            'players': {
                'online': server_info.get('players', {}).get('online', 0),
                'max': server_info.get('players', {}).get('max', 0)
            },
            'version': server_info.get('version', {}).get('name', 'Unknown'),
            'description': parse_motd(server_info.get('description', '')),
            'favicon': server_info.get('favicon', ''),
            'host': host,
            'port': port
        }
    finally:
        sock.close()

def create_handshake_packet(host: str, port: int) -> bytes:
    packet_data = b'\x00'
    packet_data += write_varint(47)
    packet_data += write_varint(len(host)) + host.encode('utf-8')
    packet_data += struct.pack('>H', port)
    packet_data += write_varint(1)
    
    return write_varint(len(packet_data)) + packet_data

def write_varint(value: int) -> bytes:
    result = b''
    while True:
        temp = value & 0x7F
        value >>= 7
        if value != 0:
            temp |= 0x80
        result += bytes([temp])
        if value == 0:
            break
    return result

def read_varint(sock: socket.socket) -> int:
    result = 0
    for i in range(5):
        data = sock.recv(1)
        if not data:
            raise ConnectionError('Connection closed')
        byte = data[0]
        result |= (byte & 0x7F) << (7 * i)
        if not byte & 0x80:
            break
    return result

def parse_motd(description: Any) -> str:
    if isinstance(description, str):
        return description
    elif isinstance(description, dict):
        return description.get('text', '')
    return str(description)
