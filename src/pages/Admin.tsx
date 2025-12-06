import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nexusadmin2024') {
      setIsAuthenticated(true);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в панель администратора",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный пароль",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из панели администратора",
    });
  };

  const [serverStatus, setServerStatus] = useState({
    online: true,
    players: 248,
    maxPlayers: 500,
    tps: 19.8,
    ram: 12.4,
    maxRam: 16
  });

  const [maintenance, setMaintenance] = useState(false);

  const sendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Объявление отправлено",
      description: "Сообщение доставлено всем игрокам",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Shield" size={40} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-black text-gradient">ADMIN PANEL</CardTitle>
            <CardDescription>Панель администратора NexusWorld</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="LogIn" className="mr-2" size={20} />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8 pt-4">
          <div>
            <h1 className="text-4xl font-black text-gradient mb-2">ADMIN PANEL</h1>
            <p className="text-foreground/70">Панель управления сервером NexusWorld</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-primary/50">
            <Icon name="LogOut" className="mr-2" size={20} />
            Выход
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Статус</p>
                  <Badge className={`${serverStatus.online ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                    {serverStatus.online ? 'Онлайн' : 'Оффлайн'}
                  </Badge>
                </div>
                <Icon name="Activity" className="text-primary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Игроки</p>
                  <p className="text-2xl font-black text-gradient">{serverStatus.players}/{serverStatus.maxPlayers}</p>
                </div>
                <Icon name="Users" className="text-primary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">TPS</p>
                  <p className="text-2xl font-black text-green-400">{serverStatus.tps}</p>
                </div>
                <Icon name="Zap" className="text-primary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">RAM</p>
                  <p className="text-2xl font-black text-gradient">{serverStatus.ram}/{serverStatus.maxRam} GB</p>
                </div>
                <Icon name="HardDrive" className="text-primary" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="control" className="space-y-6">
          <TabsList className="bg-card/50 border border-primary/30">
            <TabsTrigger value="control">
              <Icon name="Settings" className="mr-2" size={16} />
              Управление
            </TabsTrigger>
            <TabsTrigger value="players">
              <Icon name="Users" className="mr-2" size={16} />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Icon name="MessageSquare" className="mr-2" size={16} />
              Объявления
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Icon name="FileText" className="mr-2" size={16} />
              Логи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="control" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Управление сервером</CardTitle>
                <CardDescription>Основные функции управления</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="font-semibold mb-1">Режим технических работ</p>
                    <p className="text-sm text-foreground/60">Закрыть сервер для обычных игроков</p>
                  </div>
                  <Switch checked={maintenance} onCheckedChange={setMaintenance} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90">
                    <Icon name="Power" className="mr-2" size={24} />
                    Запустить сервер
                  </Button>
                  <Button variant="destructive" className="h-20">
                    <Icon name="PowerOff" className="mr-2" size={24} />
                    Остановить сервер
                  </Button>
                  <Button variant="outline" className="h-20 border-primary/50">
                    <Icon name="RotateCw" className="mr-2" size={24} />
                    Перезагрузить
                  </Button>
                  <Button variant="outline" className="h-20 border-primary/50">
                    <Icon name="Save" className="mr-2" size={24} />
                    Сохранить мир
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Управление игроками</CardTitle>
                <CardDescription>248 игроков онлайн</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Поиск игрока..." className="bg-background/50" />
                    <Button variant="outline" className="border-primary/50">
                      <Icon name="Search" size={20} />
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[
                      { name: 'Player_1337', status: 'online', location: 'Выживание' },
                      { name: 'ProGamer2024', status: 'online', location: 'BedWars' },
                      { name: 'DiamondMiner', status: 'online', location: 'Креатив' },
                      { name: 'RedstoneKing', status: 'online', location: 'Выживание' },
                      { name: 'BuildMaster', status: 'online', location: 'SkyWars' }
                    ].map((player, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold">
                            {player.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold">{player.name}</p>
                            <p className="text-sm text-foreground/60">{player.location}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/50">
                            <Icon name="MessageCircle" size={16} />
                          </Button>
                          <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500">
                            <Icon name="AlertTriangle" size={16} />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/50 text-red-500">
                            <Icon name="Ban" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Отправить объявление</CardTitle>
                <CardDescription>Сообщение для всех игроков на сервере</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendAnnouncement} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcement">Текст объявления</Label>
                    <Textarea
                      id="announcement"
                      placeholder="Введите текст объявления..."
                      className="bg-background/50 min-h-32"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить всем
                    </Button>
                    <Button type="button" variant="outline" className="border-primary/50">
                      <Icon name="Bell" className="mr-2" size={20} />
                      Отправить с уведомлением
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl">Шаблоны сообщений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { text: 'Перезагрузка через 5 минут', icon: 'RotateCw' },
                    { text: 'Технические работы', icon: 'Wrench' },
                    { text: 'Новый ивент запущен', icon: 'Sparkles' },
                    { text: 'Обновление правил', icon: 'FileText' }
                  ].map((template, i) => (
                    <Button key={i} variant="outline" className="border-primary/30 justify-start">
                      <Icon name={template.icon as any} className="mr-2" size={16} />
                      {template.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Логи сервера</CardTitle>
                <CardDescription>Последние события</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                  <p className="text-green-400">[12:34:56] [INFO] Server started successfully</p>
                  <p className="text-blue-400">[12:35:02] [INFO] Player_1337 joined the game</p>
                  <p className="text-blue-400">[12:35:15] [INFO] ProGamer2024 joined the game</p>
                  <p className="text-yellow-400">[12:35:30] [WARN] Can't keep up! Is the server overloaded?</p>
                  <p className="text-blue-400">[12:36:01] [INFO] DiamondMiner joined the game</p>
                  <p className="text-green-400">[12:36:15] [INFO] World saved successfully</p>
                  <p className="text-red-400">[12:36:45] [ERROR] Connection lost: Player timed out</p>
                  <p className="text-blue-400">[12:37:02] [INFO] RedstoneKing joined the game</p>
                  <p className="text-green-400">[12:37:30] [INFO] Plugin loaded: NexusCore v2.1</p>
                  <p className="text-blue-400">[12:38:11] [INFO] BuildMaster joined the game</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
