import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, ShoppingBag, Leaf, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
}

const LINKS = [
  {
    id: 'catalog',
    title: 'Catálogo Completo',
    icon: ShoppingBag,
    url: '#produtos',
    primary: true,
  },
  {
    id: 'whatsapp',
    title: 'Fale comigo no WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/5511953521521?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20sabonetes.',
    primary: false,
  },
  {
    id: 'instagram',
    title: 'Siga no Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/rosaescarlate7/',
    primary: false,
  },
];

function ProductCard({ product, onBuy, index }: { product: any, onBuy: (name: string) => void, index: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group flex flex-col bg-earth-50 rounded-3xl overflow-hidden border border-earth-100 hover:border-rose-200 transition-colors duration-300"
    >
      <div 
        className="relative aspect-square overflow-hidden cursor-crosshair"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 50, y: 50 });
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Images */}
        <div className="w-full h-full relative">
          {product.images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} - view ${idx + 1}`}
              referrerPolicy="no-referrer"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out
                ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                ${isHovered ? 'scale-150' : 'scale-100'}
              `}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        {product.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-1.5 rounded-full text-earth-900 shadow-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-1.5 rounded-full text-earth-900 shadow-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
              {product.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-rose-900 shadow-sm pointer-events-none">
          {product.price}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-earth-900 mb-2">{product.name}</h3>
        <p className="text-earth-800 text-sm mb-6 flex-grow leading-relaxed">
          {product.description}
        </p>
        
        <button
          onClick={() => onBuy(product.name)}
          className="w-full py-3 px-4 bg-earth-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-rose-900 transition-colors duration-300"
        >
          <ShoppingBag className="w-4 h-4" />
          Comprar
        </button>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [logoError, setLogoError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/produtos.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        setLoading(false);
      });
  }, []);

  const handleBuyClick = (productName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de comprar o ${productName}.`);
    window.open(`https://wa.me/5511953521521?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-earth-50 text-earth-900 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-rose-100/50 -z-10 rounded-b-[100px] blur-3xl opacity-60"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {!logoError ? (
            <div className="mx-auto mb-2 flex justify-center">
              <h1 className="sr-only">Saboaria Rosa Escarlate</h1>
              <img 
                src="/brand-logo.jpg" 
                alt="Saboaria Rosa Escarlate Logo" 
                className="w-64 h-64 md:w-72 md:h-72 object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center shadow-sm border border-rose-200/50">
                <Sparkles className="w-10 h-10 text-rose-600" strokeWidth={1.5} />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-4 tracking-tight">
                Saboaria Rosa Escarlate
              </h1>
            </>
          )}
          
          <p className="text-lg md:text-xl text-earth-800 font-light max-w-lg mx-auto leading-relaxed mt-4">
            Sabonetes artesanais feitos com amor, ingredientes naturais e muito carinho para a sua pele.
          </p>
        </motion.div>
      </header>

      {/* Links Section (Linktree style) */}
      <section className="px-6 pb-20 max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          {LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-300 shadow-sm border ${
                  link.primary 
                    ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 hover:shadow-md hover:shadow-rose-600/20' 
                    : 'bg-white text-earth-900 border-earth-100 hover:border-rose-200 hover:bg-rose-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-base">{link.title}</span>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section id="produtos" className="py-20 px-6 bg-white border-t border-earth-100">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-rose-900 mb-4">Destaques da Semana</h2>
            <p className="text-earth-800 max-w-xl mx-auto">
              Nossas criações mais amadas. Cada sabonete é único, feito à mão em pequenos lotes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard 
                product={product} 
                index={index} 
                onBuy={handleBuyClick} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-earth-900 text-earth-100 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {!logoError ? (
            <div className="bg-white p-1 rounded-full mb-6">
              <img 
                src="/brand-logo.jpg" 
                alt="Rosa Escarlate" 
                className="w-16 h-16 object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <Sparkles className="w-8 h-8 text-rose-400 mb-6" strokeWidth={1} />
          )}
          <h2 className="text-2xl font-serif text-white mb-2">Rosa Escarlate</h2>
          <p className="text-earth-100/70 text-sm mb-8">Saboaria Artesanal Natural</p>
          
          <div className="flex gap-6 mb-8">
            <a href="https://www.instagram.com/rosaescarlate7/" target="_blank" rel="noopener noreferrer" className="text-earth-100/70 hover:text-rose-400 transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://wa.me/5511953521521" target="_blank" rel="noopener noreferrer" className="text-earth-100/70 hover:text-rose-400 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
          
          <p className="text-xs text-earth-100/50">
            © {new Date().getFullYear()} Rosa Escarlate. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
