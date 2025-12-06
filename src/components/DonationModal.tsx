import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    name: string;
    price: string;
    gradient: string;
  };
}

export const DonationModal = ({ isOpen, onClose, packageData }: DonationModalProps) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!nickname.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите ваш игровой ник",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      toast({
        title: "Заявка создана!",
        description: `Переведите ${packageData.price} на карту 2200 2402 0361 6491 с комментарием: ${nickname}`,
      });
      
      const message = `Привет! Хочу купить привилегию ${packageData.name} за ${packageData.price}%0AМой ник: ${nickname}%0AEmail: ${email || 'не указан'}`;
      window.open(`https://t.me/NexusWorldTM?text=${message}`, '_blank');
      
      setIsProcessing(false);
      onClose();
      setNickname('');
      setEmail('');
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm border-primary/30">
        <DialogHeader>
          <div className={`h-2 rounded-t-lg bg-gradient-to-r ${packageData.gradient} -mt-6 -mx-6 mb-4`}></div>
          <DialogTitle className="text-2xl font-black text-gradient">
            Покупка {packageData.name}
          </DialogTitle>
          <DialogDescription>
            Заполните данные для покупки привилегии за {packageData.price}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Игровой ник (обязательно)</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Steve"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (необязательно)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-background/50"
            />
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Info" className="text-primary mt-0.5 flex-shrink-0" size={18} />
              <div className="text-sm space-y-1">
                <p className="font-semibold">Как получить привилегию:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Нажмите "Перейти к оплате"</li>
                  <li>Переведите {packageData.price} на карту: <span className="font-mono font-bold">2200 2402 0361 6491</span></li>
                  <li>В комментарии укажите ваш ник: <span className="font-bold">{nickname || 'ваш_ник'}</span></li>
                  <li>Привилегия активируется автоматически в течение 5-10 минут</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePurchase}
              disabled={isProcessing}
              className={`flex-1 bg-gradient-to-r ${packageData.gradient} hover:opacity-90`}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  Перейти к оплате
                </>
              )}
            </Button>
            <Button onClick={onClose} variant="outline" disabled={isProcessing}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
