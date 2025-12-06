import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ServerStatus {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
  description?: string;
}

const Index = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({ online: false });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchServerStatus = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5fe6953a-6c9f-486f-b89b-e1ce3dff62bb');
      const data = await response.json();
      setServerStatus(data);
    } catch (error) {
      console.error('Failed to fetch server status:', error);
      setServerStatus({ online: false });
    } finally {
      setLoading(false);
    }
  };

  const copyIP = () => {
    navigator.clipboard.writeText('NexusWorld.joinserver.ru');
    toast({
      title: "IP скопирован!",
      description: "NexusWorld.joinserver.ru",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Hexagon" className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-gradient">NEXUSWORLD</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/50">
                <span className={`w-2 h-2 rounded-full mr-2 ${serverStatus.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {loading ? 'Проверка...' : serverStatus.online ? `${serverStatus.players?.online || 0} онлайн` : 'Оффлайн'}
              </Badge>
              <a href="/admin">
                <Button size="sm" variant="ghost">
                  <Icon name="Settings" size={16} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Icon name="Sparkles" className="text-primary" size={16} />
              <span className="text-sm font-medium">Версии 1.16.5 - 1.21.1</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="text-gradient">NEXUS</span>
              <br />
              <span className="text-foreground">WORLD</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Легендарный сервер с уникальными режимами игры и активным комьюнити
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Card className="w-full sm:w-auto bg-card/50 backdrop-blur-sm border-primary/30">
                <CardContent className="flex items-center gap-4 p-4">
                  <Icon name="Server" className="text-primary" size={28} />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Подключение</p>
                    <p className="text-lg font-mono font-bold">NexusWorld.joinserver.ru</p>
                  </div>
                  <Button onClick={copyIP} size="sm" variant="ghost">
                    <Icon name="Copy" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-8">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Play" className="mr-2" size={20} />
                Начать играть
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Gift" className="mr-2" size={20} />
                Донат
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="BookOpen" className="mr-2" size={20} />
                Правила
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all">
              <CardHeader className="text-center pb-3">
                <Icon name="Users" className="mx-auto mb-3 text-primary" size={40} />
                <CardTitle className="text-4xl font-black text-gradient">
                  {loading ? '...' : serverStatus.online ? serverStatus.players?.online || 0 : '0'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Игроков онлайн</p>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all">
              <CardHeader className="text-center pb-3">
                <Icon name="Trophy" className="mx-auto mb-3 text-primary" size={40} />
                <CardTitle className="text-4xl font-black text-gradient">15K+</CardTitle>
                <p className="text-sm text-muted-foreground">Зарегистрировано</p>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all">
              <CardHeader className="text-center pb-3">
                <Icon name="Gamepad2" className="mx-auto mb-3 text-primary" size={40} />
                <CardTitle className="text-4xl font-black text-gradient">12+</CardTitle>
                <p className="text-sm text-muted-foreground">Режимов игры</p>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all">
              <CardHeader className="text-center pb-3">
                <Icon name="Clock" className="mx-auto mb-3 text-primary" size={40} />
                <CardTitle className="text-4xl font-black text-gradient">24/7</CardTitle>
                <p className="text-sm text-muted-foreground">Работаем онлайн</p>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              <span className="text-gradient">Режимы игры</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Swords',
                  title: 'Выживание',
                  description: 'Классический режим с уникальными дополнениями и крафтами'
                },
                {
                  icon: 'Sparkles',
                  title: 'Мини-игры',
                  description: 'BedWars, SkyWars, Duels и многое другое'
                },
                {
                  icon: 'Building',
                  title: 'Креатив',
                  description: 'Безграничное творчество с WorldEdit'
                },
                {
                  icon: 'Coins',
                  title: 'Экономика',
                  description: 'Развитая система торговли и магазинов'
                },
                {
                  icon: 'Zap',
                  title: 'РПГ',
                  description: 'Квесты, способности и прокачка персонажа'
                },
                {
                  icon: 'Crown',
                  title: 'PvP Арены',
                  description: 'Соревнуйтесь с другими игроками'
                }
              ].map((mode, i) => (
                <Card key={i} className="bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all group">
                  <CardHeader>
                    <Icon name={mode.icon as any} className="mb-4 text-primary group-hover:scale-110 transition-transform" size={48} />
                    <CardTitle className="text-xl mb-2">{mode.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              <span className="text-gradient">Привилегии</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'VIP',
                  price: '199₽',
                  features: ['Префикс [VIP]', 'Доступ к /fly', '5 регионов', 'Цветной ник'],
                  gradient: 'from-green-500 to-emerald-600'
                },
                {
                  name: 'PREMIUM',
                  price: '399₽',
                  features: ['Префикс [PREMIUM]', 'Команды /fly, /god', '10 регионов', 'Эффекты', 'Приоритет'],
                  gradient: 'from-blue-500 to-cyan-600',
                  popular: true
                },
                {
                  name: 'LEGEND',
                  price: '799₽',
                  features: ['Префикс [LEGEND]', 'Все команды', 'Без ограничений', 'Эксклюзив', 'VIP очередь'],
                  gradient: 'from-purple-500 to-pink-600'
                }
              ].map((pkg, i) => (
                <Card key={i} className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all ${pkg.popular ? 'scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <div className={`h-1 bg-gradient-to-r ${pkg.gradient}`}></div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-black mb-2">{pkg.name}</CardTitle>
                    <p className="text-4xl font-black text-gradient">{pkg.price}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pkg.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                    <Button className={`w-full mt-4 bg-gradient-to-r ${pkg.gradient} hover:opacity-90`}>
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              <span className="text-gradient">Команда</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { name: 'Александр Ефремов', role: 'Главный админ', avatar: '👑' },
                { name: 'Сергей Арутюнян', role: 'Помощник админа', avatar: '⚙️' },
                { name: 'Александр Штейнле', role: 'Модератор', avatar: '🛡️' },
                { name: 'Тимофей Маркин', role: 'Хелпер', avatar: '✨' }
              ].map((member, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-all">
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-3">{member.avatar}</div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-primary font-semibold">{member.role}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader className="text-center">
              <h2 className="text-3xl font-black text-gradient mb-4">Присоединяйся к нам</h2>
              <p className="text-muted-foreground">Следи за новостями и общайся с комьюнити</p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 hover:bg-primary/5 hover:border-primary/50 transition-all" 
                  size="lg"
                  asChild
                >
                  <a href="https://t.me/NexusWorldTM" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" className="mr-2" size={24} />
                    Telegram
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 hover:bg-primary/5 hover:border-primary/50 transition-all" 
                  size="lg"
                  asChild
                >
                  <a href="https://www.youtube.com/@NexusWorldTM" target="_blank" rel="noopener noreferrer">
                    <Icon name="Youtube" className="mr-2" size={24} />
                    YouTube
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 hover:bg-primary/5 hover:border-primary/50 transition-all" 
                  size="lg"
                  asChild
                >
                  <a href="mailto:alek.efremov@icloud.com">
                    <Icon name="Mail" className="mr-2" size={24} />
                    Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 NexusWorld. Все права защищены.</p>
          <p className="mt-2">Мы не связаны с Mojang AB</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;