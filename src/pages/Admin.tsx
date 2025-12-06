import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { themes, applyTheme } from '@/lib/themes';

interface SiteSettings {
  site_title: string;
  site_description: string;
  telegram_link: string;
  youtube_link: string;
  email: string;
  server_ip: string;
  theme: string;
}

interface DonationPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  color_from: string;
  color_to: string;
  is_popular: boolean;
  is_active: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    site_title: 'NEXUSWORLD',
    site_description: 'Легендарный сервер с уникальными режимами игры',
    telegram_link: 'https://t.me/NexusWorldTM',
    youtube_link: 'https://www.youtube.com/@NexusWorldTM',
    email: 'alek.efremov@icloud.com',
    server_ip: 'NexusWorld.joinserver.ru',
    theme: 'default'
  });

  const [packages, setPackages] = useState<DonationPackage[]>([]);
  const [editingPackage, setEditingPackage] = useState<DonationPackage | null>(null);

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
    navigate('/');
    toast({
      title: "Выход выполнен",
    });
  };

  const saveSiteSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Изменения будут применены после перезагрузки",
    });
  };

  const savePackage = () => {
    if (editingPackage) {
      const index = packages.findIndex(p => p.id === editingPackage.id);
      if (index !== -1) {
        const newPackages = [...packages];
        newPackages[index] = editingPackage;
        setPackages(newPackages);
      } else {
        setPackages([...packages, { ...editingPackage, id: Date.now() }]);
      }
      setEditingPackage(null);
      toast({
        title: "Пакет сохранён",
      });
    }
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
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/')}
              >
                <Icon name="Home" className="mr-2" size={20} />
                На главную
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
            <p className="text-foreground/70">Панель управления сайтом NexusWorld</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/')} variant="outline" className="border-primary/50">
              <Icon name="Home" className="mr-2" size={20} />
              На главную
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-primary/50">
              <Icon name="LogOut" className="mr-2" size={20} />
              Выход
            </Button>
          </div>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="bg-card/50 border border-primary/30">
            <TabsTrigger value="site">
              <Icon name="Settings" className="mr-2" size={16} />
              Настройки сайта
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Icon name="Gift" className="mr-2" size={16} />
              Донат-пакеты
            </TabsTrigger>
            <TabsTrigger value="theme">
              <Icon name="Palette" className="mr-2" size={16} />
              Темы оформления
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Icon name="CreditCard" className="mr-2" size={16} />
              Транзакции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="site" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Основные настройки</CardTitle>
                <CardDescription>Управление контентом главной страницы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Название сайта</Label>
                    <Input
                      value={siteSettings.site_title}
                      onChange={(e) => setSiteSettings({...siteSettings, site_title: e.target.value})}
                      placeholder="NEXUSWORLD"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IP сервера</Label>
                    <Input
                      value={siteSettings.server_ip}
                      onChange={(e) => setSiteSettings({...siteSettings, server_ip: e.target.value})}
                      placeholder="NexusWorld.joinserver.ru"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Описание сайта</Label>
                  <Textarea
                    value={siteSettings.site_description}
                    onChange={(e) => setSiteSettings({...siteSettings, site_description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Telegram</Label>
                    <Input
                      value={siteSettings.telegram_link}
                      onChange={(e) => setSiteSettings({...siteSettings, telegram_link: e.target.value})}
                      placeholder="https://t.me/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube</Label>
                    <Input
                      value={siteSettings.youtube_link}
                      onChange={(e) => setSiteSettings({...siteSettings, youtube_link: e.target.value})}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <Button onClick={saveSiteSettings} className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Save" className="mr-2" size={20} />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Управление донат-пакетами</CardTitle>
                <CardDescription>Редактирование привилегий и цен</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingPackage ? (
                  <div className="space-y-4 p-4 border border-primary/30 rounded-lg bg-background/30">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input
                          value={editingPackage.name}
                          onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Цена (₽)</Label>
                        <Input
                          type="number"
                          value={editingPackage.price}
                          onChange={(e) => setEditingPackage({...editingPackage, price: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Описание</Label>
                      <Input
                        value={editingPackage.description}
                        onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Возможности (по одной на строку)</Label>
                      <Textarea
                        value={editingPackage.features.join('\n')}
                        onChange={(e) => setEditingPackage({...editingPackage, features: e.target.value.split('\n')})}
                        rows={5}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Цвет градиента (от)</Label>
                        <Input
                          value={editingPackage.color_from}
                          onChange={(e) => setEditingPackage({...editingPackage, color_from: e.target.value})}
                          placeholder="blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Цвет градиента (до)</Label>
                        <Input
                          value={editingPackage.color_to}
                          onChange={(e) => setEditingPackage({...editingPackage, color_to: e.target.value})}
                          placeholder="cyan-600"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editingPackage.is_popular}
                          onCheckedChange={(checked) => setEditingPackage({...editingPackage, is_popular: checked})}
                        />
                        <Label>Популярный</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editingPackage.is_active}
                          onCheckedChange={(checked) => setEditingPackage({...editingPackage, is_active: checked})}
                        />
                        <Label>Активен</Label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={savePackage} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Save" className="mr-2" size={20} />
                        Сохранить
                      </Button>
                      <Button onClick={() => setEditingPackage(null)} variant="outline" className="flex-1">
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setEditingPackage({
                      name: '',
                      price: 0,
                      description: '',
                      features: [],
                      color_from: 'blue-500',
                      color_to: 'cyan-600',
                      is_popular: false,
                      is_active: true
                    })}
                    className="w-full"
                  >
                    <Icon name="Plus" className="mr-2" size={20} />
                    Добавить новый пакет
                  </Button>
                )}

                <div className="text-sm text-muted-foreground mt-4">
                  <p className="font-semibold mb-2">Текущие донат-пакеты будут загружены из базы данных</p>
                  <p>Используйте форму выше для добавления и редактирования</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Темы оформления</CardTitle>
                <CardDescription>Выберите цветовую схему сайта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <Card 
                      key={theme.value}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        siteSettings.theme === theme.value ? 'border-primary border-2' : 'border-border/40'
                      }`}
                      onClick={() => {
                        setSiteSettings({...siteSettings, theme: theme.value});
                        applyTheme(theme.value);
                        toast({
                          title: "Тема применена",
                          description: `Выбрана тема: ${theme.name}`,
                        });
                      }}
                    >
                      <CardContent className="p-4">
                        <div 
                          className="h-20 rounded-lg mb-3" 
                          style={{
                            background: `linear-gradient(to right, hsl(${theme.colors.primary}), hsl(${theme.colors.secondary}))`
                          }}
                        ></div>
                        <p className="font-semibold text-center">{theme.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button onClick={saveSiteSettings} className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Save" className="mr-2" size={20} />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">История транзакций</CardTitle>
                <CardDescription>Просмотр покупок донат-пакетов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="CreditCard" className="mx-auto mb-4" size={48} />
                  <p>Транзакции будут отображаться здесь после настройки платёжной системы</p>
                  <p className="text-sm mt-2">Карта для получения платежей: 2200 2402 0361 6491</p>
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