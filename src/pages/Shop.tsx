import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, Check, Star, Shield, Truck, Leaf, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addingCartId, setAddingCartId] = useState<string | null>(null);

  const categories = ['Alle', 'Reinigung', 'Anti-Aging', 'Sonnenschutz', 'Hygiene'];

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'Alle' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (id: string) => {
    setAddingCartId(id);
    setTimeout(() => {
      setAddingCartId(null);
    }, 1500);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-soft-shell py-16 md:py-24 overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="z-10">
            <span className="font-display text-xs font-bold text-slate-muted mb-4 block uppercase tracking-widest">
              EXKLUSIVE PFLEGE
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Wissenschaft für Ihre Haut.
            </h1>
            <p className="font-sans text-lg text-tertiary max-w-lg mb-8 leading-relaxed">
              Entdecken Sie unsere kuratierte Auswahl an medizinischen Kosmetikprodukten und Hygieneartikeln für maximale Wirksamkeit und Ästhetik.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById('shop-grid');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary text-pure-white px-8 py-4 font-display text-xs font-bold uppercase tracking-widest medical-glow hover:opacity-95 active:scale-95 transition-all rounded"
              >
                Jetzt Shoppen
              </button>
              <a
                href="/terminbuchung"
                className="border border-slate-muted text-slate-muted px-8 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-slate-muted/5 active:scale-95 transition-all text-center rounded"
              >
                Beratung vereinbaren
              </a>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[450px]">
            <div className="absolute inset-0 bg-primary-fixed-dim/20 rounded-full blur-3xl -z-10"></div>
            <img
              alt="SKIN Shop Hero"
              className="w-full h-full object-cover rounded-lg medical-glow border border-pure-white/50 shadow-lg"
              src="/images/products/shop_hero.png"
            />
          </div>
        </div>
      </section>

      {/* Category & Filter Bar */}
      <div className="sticky top-20 z-40 bg-pure-white/95 backdrop-blur-md border-b border-outline-variant/10 py-4 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-display text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                    isActive
                      ? 'bg-primary text-pure-white'
                      : 'bg-sky-accent/10 text-primary hover:bg-sky-accent/20'
                  }`}
                >
                  {cat === 'Alle' ? 'Alle Produkte' : cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-soft-shell border-none border-b border-outline-variant focus:border-primary focus:ring-0 py-2 pl-4 pr-10 text-sm rounded-t"
                placeholder="Suchen..."
                type="text"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-muted" />
            </div>
            <button className="flex items-center gap-2 text-tertiary hover:text-primary transition-colors cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-display text-xs font-bold uppercase tracking-wider">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section id="shop-grid" className="py-16 max-w-container-max mx-auto px-margin-mobile md:px-gutter min-h-[400px]">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-soft-shell/20 border border-dashed border-outline-variant/30 rounded-lg">
            <p className="font-sans text-base text-tertiary">Keine Produkte gefunden, die Ihren Suchkriterien entsprechen.</p>
            <button
              onClick={() => {
                setSelectedCategory('Alle');
                setSearchQuery('');
              }}
              className="mt-4 text-primary font-display text-xs font-bold uppercase tracking-wider underline underline-offset-4"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-pure-white medical-glow border border-outline-variant/10 overflow-hidden transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between rounded-lg"
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-soft-shell">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.image}
                  />
                  {product.bestseller && (
                    <span className="absolute top-4 left-4 bg-primary text-pure-white font-display text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded">
                      BESTSELLER
                    </span>
                  )}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="absolute bottom-4 right-4 bg-pure-white/90 backdrop-blur-sm p-3 rounded-full medical-glow hover:bg-pure-white active:scale-90 transition-all duration-300 shadow-md flex items-center justify-center w-10 h-10 border border-outline-variant/10"
                    aria-label="Add to cart"
                  >
                    {addingCartId === product.id ? (
                      <Check className="w-4 h-4 text-secondary stroke-[3]" />
                    ) : (
                      <ShoppingCart className="w-4 h-4 text-primary" />
                    )}
                  </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-display text-[10px] font-bold text-slate-muted uppercase tracking-widest mb-2 block">
                      {product.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-primary mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-tertiary mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-display text-lg font-bold text-primary whitespace-nowrap">
                      {product.priceFormatted}
                    </span>
                    <div className="flex text-sky-accent gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < product.rating ? 'fill-current' : 'opacity-35'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / Trust Section */}
      <section className="bg-primary text-pure-white py-24 border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Expertise direkt in Ihr Postfach.
            </h2>
            <p className="font-sans text-base text-primary-fixed mb-8 opacity-90 leading-relaxed max-w-lg">
              Melden Sie sich für unseren Newsletter an und erhalten Sie exklusive Pflegetipps unserer Experten sowie 10% Rabatt auf Ihre erste Bestellung.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                className="flex-1 bg-pure-white/10 border-none border-b border-pure-white/30 focus:border-pure-white py-4 px-4 text-pure-white placeholder:text-pure-white/40 focus:ring-0 focus:outline-none rounded-t"
                placeholder="Ihre E-Mail Adresse"
                required
                type="email"
              />
              <button className="bg-pure-white text-primary px-8 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-primary-fixed transition-all rounded">
                Abonnieren
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-pure-white/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-sky-accent" />
              </div>
              <h4 className="font-display text-xs font-bold mb-2 uppercase tracking-wider text-pure-white">Medizinisch geprüft</h4>
              <p className="text-xs text-primary-fixed/80">Alle Produkte sind klinisch getestet.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-pure-white/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-sky-accent" />
              </div>
              <h4 className="font-display text-xs font-bold mb-2 uppercase tracking-wider text-pure-white">Schneller Versand</h4>
              <p className="text-xs text-primary-fixed/80">Kostenlos ab 50€ Bestellwert.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-pure-white/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-sky-accent" />
              </div>
              <h4 className="font-display text-xs font-bold mb-2 uppercase tracking-wider text-pure-white">Nachhaltig</h4>
              <p className="text-xs text-primary-fixed/80">Verantwortungsvolle Verpackungen.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-pure-white/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-sky-accent" />
              </div>
              <h4 className="font-display text-xs font-bold mb-2 uppercase tracking-wider text-pure-white">Expertenberatung</h4>
              <p className="text-xs text-primary-fixed/80">Wir beraten Sie jederzeit online.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
