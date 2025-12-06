import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

  const copyIP = () => {
    navigator.clipboard.writeText('NexusWorld.joinserver.ru');
    toast({
      title: "IP скопирован!",
      description: "NexusWorld.joinserver.ru",
    });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const donationPackages = [
    {
      name: 'VIP',
      price: '199₽',
      features: ['Префикс [VIP]', 'Доступ к /fly', '5 приватных регионов', 'Цветной ник'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'PREMIUM',
      price: '399₽',
      features: ['Префикс [PREMIUM]', 'Доступ к /fly и /god', '10 приватных регионов', 'Уникальные эффекты', 'Цветной ник'],
      color: 'from-blue-500 to-cyan-600',
      popular: true
    },
    {
      name: 'LEGEND',
      price: '799₽',
      features: ['Префикс [LEGEND]', 'Все команды', 'Безлимит регионов', 'Эксклюзивные скины', 'Приоритет в очереди'],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const rules = [
    { title: 'Правило 1: Уважение', content: 'Запрещены оскорбления, мат и токсичное поведение по отношению к другим игрокам.' },
    { title: 'Правило 2: Читы', content: 'Использование читов, багов и эксплойтов строго запрещено и карается вечным баном.' },
    { title: 'Правило 3: Гриферство', content: 'Порча чужих построек без разрешения владельца запрещена.' },
    { title: 'Правило 4: Спам', content: 'Запрещен спам в чате, капс и реклама других серверов.' },
    { title: 'Правило 5: Ники', content: 'Ники не должны содержать оскорблений или нецензурной лексики.' }
  ];

  const team = [
    { name: 'Александр Ефремов', role: 'Главный админ', avatar: '👑' },
    { name: 'Сергей Арутюнян', role: 'Помощник админа', avatar: '⚙️' },
    { name: 'Александр Штейнле', role: 'Модератор', avatar: '🛡️' },
    { name: 'Тимофей Маркин', role: 'Хелпер', avatar: '✨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-gradient">NEXUSWORLD</h1>
          <div className="hidden md:flex gap-6 items-center">
            {['home', 'donate', 'rules', 'about', 'team', 'status', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeSection === section ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {section === 'home' ? 'Главная' : 
                 section === 'donate' ? 'Донат' :
                 section === 'rules' ? 'Правила' :
                 section === 'about' ? 'О сервере' :
                 section === 'team' ? 'Команда' :
                 section === 'status' ? 'Статус' : 'Контакты'}
              </button>
            ))}
            <a href="/admin" className="ml-4">
              <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Shield" className="mr-2" size={16} />
                Admin
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-epic animate-gradient opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 text-lg px-6 py-2 bg-primary/20 border-primary/50 text-primary hover:bg-primary/30">
            Версии 1.16.5 - 1.21.1
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-gradient animate-fade-in">
            NEXUSWORLD
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto font-light">
            Погрузись в эпический мир приключений, где каждый может стать легендой
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg px-8 py-4 flex items-center gap-4">
              <Icon name="Server" className="text-primary" size={32} />
              <div className="text-left">
                <p className="text-sm text-foreground/60 uppercase tracking-wider">IP Сервера</p>
                <p className="text-2xl font-bold text-foreground">NexusWorld.joinserver.ru</p>
              </div>
              <Button onClick={copyIP} size="sm" className="bg-primary hover:bg-primary/80">
                <Icon name="Copy" size={16} />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg font-bold px-8 py-6">
              <Icon name="Play" className="mr-2" size={24} />
              Начать играть
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 text-lg font-bold px-8 py-6 hover:bg-primary/10" onClick={() => scrollToSection('donate')}>
              <Icon name="Gem" className="mr-2" size={24} />
              Донат
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { icon: 'Users', label: 'Онлайн', value: '248+' },
              { icon: 'Trophy', label: 'Игроков', value: '15K+' },
              { icon: 'Zap', label: 'Режимов', value: '12+' },
              { icon: 'Shield', label: 'Аптайм', value: '99.9%' }
            ].map((stat, i) => (
              <Card key={i} className="bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <Icon name={stat.icon as any} className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-3xl font-black text-gradient">{stat.value}</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gradient mb-4">ПРИВИЛЕГИИ</h2>
            <p className="text-xl text-foreground/70">Поддержи сервер и получи уникальные возможности</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {donationPackages.map((pkg, i) => (
              <Card key={i} className={`relative overflow-hidden border-2 ${pkg.popular ? 'border-primary scale-105' : 'border-primary/30'} hover:scale-110 transition-all`}>
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Популярный</Badge>
                )}
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`}></div>
                <CardHeader>
                  <CardTitle className="text-3xl font-black">{pkg.name}</CardTitle>
                  <CardDescription className="text-4xl font-black text-gradient mt-2">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 font-bold`}>
                    Купить сейчас
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="py-24 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-black text-gradient mb-12 text-center">ПРАВИЛА СЕРВЕРА</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {rules.map((rule, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-primary/30 rounded-lg px-6 bg-card/50 backdrop-blur-sm">
                <AccordionTrigger className="text-lg font-bold hover:text-primary">
                  {rule.title}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {rule.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-gradient mb-12 text-center">О СЕРВЕРЕ</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: 'Swords', title: 'Выживание', desc: 'Классическое выживание с уникальными дополнениями и крафтами' },
              { icon: 'Crown', title: 'Мини-игры', desc: 'Десятки увлекательных мини-игр: BedWars, SkyWars, Duel и другие' },
              { icon: 'Building', title: 'Креатив', desc: 'Безграничный креатив с WorldEdit и уникальными плагинами' },
              { icon: 'Coins', title: 'Экономика', desc: 'Развитая экономика с магазинами, аукционом и торговлей' },
              { icon: 'Sparkles', title: 'РПГ элементы', desc: 'Уникальные способности, квесты и система прокачки' },
              { icon: 'Shield', title: 'Защита', desc: 'Надёжная защита от гриферов и античит системы' }
            ].map((feature, i) => (
              <Card key={i} className="bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <CardHeader>
                  <Icon name={feature.icon as any} className="mb-4 text-primary" size={48} />
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-gradient mb-12 text-center">КОМАНДА</h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:scale-105 text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="status" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-black text-gradient mb-12 text-center">СТАТУС СЕРВЕРА</h2>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">Сервер онлайн</CardTitle>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-lg px-4 py-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2 animate-pulse"></span>
                  Онлайн
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="text-foreground/70">Игроков онлайн</span>
                    <span className="text-2xl font-bold text-primary">248 / 500</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="text-foreground/70">TPS</span>
                    <span className="text-2xl font-bold text-green-400">19.8</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="text-foreground/70">Версия</span>
                    <span className="text-xl font-bold">1.16.5 - 1.21.1</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="text-foreground/70">Аптайм</span>
                    <span className="text-2xl font-bold text-primary">99.9%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-24 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-5xl font-black text-gradient mb-12">КОНТАКТЫ</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'MessageCircle', name: 'Discord', link: '#' },
              { icon: 'Send', name: 'Telegram', link: '#' },
              { icon: 'Youtube', name: 'YouTube', link: '#' }
            ].map((social, i) => (
              <Button key={i} variant="outline" size="lg" className="h-24 border-primary/30 hover:border-primary hover:bg-primary/10 text-lg font-bold">
                <Icon name={social.icon as any} className="mr-3" size={32} />
                {social.name}
              </Button>
            ))}
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="pt-6">
              <p className="text-foreground/70 mb-4">По всем вопросам пишите на</p>
              <p className="text-xl font-bold text-primary">support@nexusworld.ru</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p className="font-semibold">© 2024 NexusWorld. Все права защищены.</p>
          <p className="text-sm mt-2">Мы не связаны с Mojang AB</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;