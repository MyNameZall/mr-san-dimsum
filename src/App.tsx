import { useState, useMemo, useEffect, useRef } from 'react';
import './index.css';
import type { MenuItem, CartItem, OrderType, Category } from './types';
import { menuData, categories, testimonials, faqs } from './data/menuData';

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('semua');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [activeCategory, search]);

  const filtered = useMemo(() => {
    return menuData.filter(item => {
      const matchCat = activeCategory === 'semua' || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(item: MenuItem) {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id: number, delta: number) {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0)
    );
  }

  function removeItem(id: number) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function sendWhatsApp() {
    if (!cart.length) return;
    const type = orderType === 'dine-in' ? 'Makan di Tempat' : 'Bawa Pulang';
    let msg = `Halo Dimsum Mr. San! Saya ingin memesan:\n\n*Tipe:* ${type}\n\n*Pesanan:*\n`;
    cart.forEach(i => { msg += `- ${i.name} x${i.qty} = ${formatRupiah(i.price * i.qty)}\n`; });
    msg += `\n*Total: ${formatRupiah(totalPrice)}*\n\nTerima kasih!`;
    window.open(`https://wa.me/6285648343970?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <div className="nav-logo-icon"><i className="fa-solid fa-bowl-food"></i></div>
            Mr. San Dimsum
          </a>
          <ul className="nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#info">Info Outlet</a></li>
            <li><a href="#ulasan">Ulasan</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li>
              <a href="https://wa.me/6285648343970" target="_blank" rel="noreferrer" className="nav-cta">
                <i className="fa-brands fa-whatsapp"></i> Pesan Sekarang
              </a>
            </li>
          </ul>
          <button className="hamburger" id="hamburger-btn" onClick={() => setMobileMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        {['#menu', '#info', '#ulasan', '#faq'].map((href, i) => (
          <a key={i} href={href} onClick={() => setMobileMenuOpen(false)}>
            {['Menu', 'Info Outlet', 'Ulasan', 'FAQ'][i]}
          </a>
        ))}
        <a href="https://wa.me/6285648343970" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>
          Pesan via WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=90"
            alt="Dimsum Mr. San background"
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge anim" style={{ animationDelay: '0.1s' }}>
            <i className="fa-solid fa-fire"></i>
            Favorit di Lamongan sejak 2015
          </div>
          <h1 className="hero-title anim" style={{ animationDelay: '0.2s' }}>
            Cita Rasa Dimsum<br />
            <span>Autentik</span> di Lamongan
          </h1>
          <p className="hero-sub anim" style={{ animationDelay: '0.3s' }}>
            Dimsum segar dibuat setiap hari dari bahan pilihan.<br />
            Harga terjangkau, rasa bintang lima.
          </p>
          <div className="hero-rating anim" style={{ animationDelay: '0.4s' }}>
            <div className="stars">
              {[1,2,3,4].map(i => <i key={i} className="fa-solid fa-star"></i>)}
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <span className="rating-text">4.7</span>
            <span className="rating-count">dari 20 ulasan Google Maps</span>
          </div>
          <div className="hero-actions anim" style={{ animationDelay: '0.5s' }}>
            <button
              id="lihat-menu-btn"
              className="btn-primary"
              onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <i className="fa-solid fa-utensils"></i>
              Lihat Menu Kami
            </button>
            <a
              id="wa-hero-btn"
              href="https://wa.me/6285648343970"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <i className="fa-brands fa-whatsapp"></i>
              Pesan via WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            {[
              { num: '4.7', label: 'Rating Google' },
              { num: '20+', label: 'Ulasan Puas' },
              { num: 'Rp25rb', label: 'Harga Tertinggi' },
              { num: '21.00', label: 'Tutup WIB' },
            ].map((s, i) => (
              <div className="hero-stat anim" key={i} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <div className="about-strip reveal">
        <div className="about-strip-inner">
          <div className="about-strip-text">
            Melayani dengan Cinta Setiap Hari
            <span>Kualitas premium, harga rakyat — itu janji Mr. San untuk Lamongan</span>
          </div>
          <div className="about-strip-badges">
            {[
              { icon: 'fa-utensils', label: 'Makan di Tempat' },
              { icon: 'fa-bag-shopping', label: 'Bawa Pulang' },
              { icon: 'fa-clock', label: 'Buka Setiap Hari' },
            ].map((b, i) => (
              <div className="strip-badge" key={i}>
                <i className={`fa-solid ${b.icon}`}></i>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MENU */}
      <section className="section menu-section" id="menu" ref={menuRef}>
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag"><i className="fa-solid fa-bowl-food"></i> Menu Kami</div>
            <h2 className="section-title">Pilihan Dimsum Favorit</h2>
            <div className="divider"></div>
            <p className="section-desc" style={{ marginTop: 16 }}>
              Dari dimsum kukus hingga goreng, semua dibuat fresh setiap hari
            </p>
          </div>

          <div className="menu-controls">
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  id={`cat-${cat.key}`}
                  className={`cat-btn${activeCategory === cat.key ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat.key as Category)}
                >
                  <i className={`fa-solid ${cat.icon}`}></i>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                id="search-menu"
                type="text"
                placeholder="Cari menu..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <i className="fa-solid fa-bowl-food"></i>
              <p>Menu tidak ditemukan. Coba kata kunci lain.</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filtered.map((item, idx) => (
                <div
                  className={`menu-card reveal delay-${(idx % 6) + 1}`}
                  key={item.id}
                >
                  <div className="card-img">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="card-img-overlay" />
                    {item.popular && (
                      <span className="popular-badge">
                        <i className="fa-solid fa-fire"></i> Populer
                      </span>
                    )}
                    <span className="card-category">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-name">{item.name}</div>
                    <div className="card-desc">{item.description}</div>
                    <div className="card-footer">
                      <span className="card-price">{formatRupiah(item.price)}</span>
                      <button
                        id={`add-${item.id}`}
                        className="add-btn"
                        onClick={() => { addToCart(item); setCartOpen(true); }}
                      >
                        <i className="fa-solid fa-plus"></i>
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INFO OUTLET */}
      <section className="section info-section" id="info">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag"><i className="fa-solid fa-store"></i> Info Outlet</div>
            <h2 className="section-title">Informasi Lengkap Outlet</h2>
            <div className="divider"></div>
          </div>
          <div className="info-grid">
            <div>
              <div className="info-card reveal-left">
                <div className="info-card-header">
                  <div className="info-icon"><i className="fa-solid fa-clock"></i></div>
                  <h3>Jam Operasional</h3>
                </div>
                {[
                  { day: 'Senin – Jumat', time: 'Buka – 21.00 WIB', open: true },
                  { day: 'Sabtu – Minggu', time: 'Buka – 21.00 WIB', open: true },
                ].map((r, i) => (
                  <div className="info-row" key={i}>
                    <span className="day">{r.day}</span>
                    <span className={`time${r.open ? ' open' : ''}`}>{r.time}</span>
                  </div>
                ))}
              </div>
              <div className="info-card reveal-left delay-2">
                <div className="info-card-header">
                  <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <h3>Alamat & Kontak</h3>
                </div>
                <div className="contact-links">
                  <a href="https://maps.google.com/?q=Dimsum+Mr+San+Lamongan" target="_blank" rel="noreferrer" className="contact-link">
                    <i className="fa-solid fa-map-pin"></i>
                    Jl. Sunan Drajat No.190, Kalikapas, Sidoharjo, Kec. Lamongan
                  </a>
                  <a href="tel:+6285648343970" className="contact-link">
                    <i className="fa-solid fa-phone"></i>
                    +62 856-4834-3970
                  </a>
                  <a href="https://wa.me/6285648343970" target="_blank" rel="noreferrer" className="contact-link">
                    <i className="fa-brands fa-whatsapp"></i>
                    Chat via WhatsApp
                  </a>
                  <a href="https://maps.google.com/?q=Dimsum+Mr+San+Lamongan" target="_blank" rel="noreferrer" className="contact-link">
                    <i className="fa-solid fa-route"></i>
                    Dapatkan Rute ke Sini
                  </a>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <iframe
                className="map-embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d112.4151!3d-7.1186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDcnMDYuOSJTIDExMsKwMjQnNTQuNCJF!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Dimsum Mr. San"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testi-section" id="ulasan">
        <div className="section-inner">
          <div className="section-header center reveal">
            <div className="section-tag"><i className="fa-solid fa-star"></i> Ulasan Pelanggan</div>
            <h2 className="section-title">Kata Mereka Tentang Kami</h2>
            <div className="divider"></div>
            <p className="section-desc" style={{ marginTop: 16 }}>
              Rating 4.7/5 dari pelanggan setia Mr. San Lamongan
            </p>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, idx) => (
              <div className={`testi-card reveal-scale delay-${(idx % 4) + 1}`} key={t.id}>
                <div className="testi-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="testi-text">"{t.comment}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-date">
                      <i className="fa-regular fa-clock" style={{ marginRight: 4 }}></i>
                      {t.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="section-inner">
          <div className="section-header center reveal">
            <div className="section-tag"><i className="fa-solid fa-circle-question"></i> FAQ</div>
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            <div className="divider"></div>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item reveal delay-${(i % 4) + 1}`} key={i}>
                <button
                  id={`faq-btn-${i}`}
                  className={`faq-q${openFaq === i ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <div className="faq-icon">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </button>
                <div className={`faq-a${openFaq === i ? ' open' : ''}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">
                <div className="footer-logo-icon"><i className="fa-solid fa-bowl-food"></i></div>
                Dimsum Mr. San
              </div>
              <p className="footer-desc">
                Outlet dimsum terbaik di Lamongan. Cita rasa autentik, harga terjangkau, pelayanan ramah. Buka setiap hari hingga pukul 21.00 WIB.
              </p>
              <div className="footer-social">
                <a href="https://wa.me/6285648343970" target="_blank" rel="noreferrer" className="social-btn">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="https://maps.google.com/?q=Dimsum+Mr+San+Lamongan" target="_blank" rel="noreferrer" className="social-btn">
                  <i className="fa-brands fa-google"></i>
                </a>
                <a href="tel:+6285648343970" className="social-btn">
                  <i className="fa-solid fa-phone"></i>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Navigasi</h4>
              <ul>
                {[['#home','Beranda'],['#menu','Menu'],['#info','Info Outlet'],['#ulasan','Ulasan'],['#faq','FAQ']].map(([href, label]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontak</h4>
              <ul>
                <li><a href="tel:+6285648343970">+62 856-4834-3970</a></li>
                <li><a href="https://wa.me/6285648343970" target="_blank" rel="noreferrer">WhatsApp Kami</a></li>
                <li><a href="https://maps.google.com/?q=Dimsum+Mr+San+Lamongan" target="_blank" rel="noreferrer">Lihat di Google Maps</a></li>
              </ul>
              <div style={{ marginTop: 20, fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.8 }}>
                <div><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginRight: 8 }}></i>Jl. Sunan Drajat No.190, Lamongan</div>
                <div style={{ marginTop: 6 }}><i className="fa-solid fa-clock" style={{ color: 'var(--primary)', marginRight: 8 }}></i>Buka Setiap Hari – 21.00 WIB</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2024 <span className="accent">Dimsum Mr. San</span>. Hak cipta dilindungi.</span>
            <span>Dibuat dengan <i className="fa-solid fa-heart" style={{ color: 'var(--primary)' }}></i> untuk Lamongan</span>
          </div>
        </div>
      </footer>

      {/* CART FAB */}
      <button id="cart-fab" className="cart-fab" onClick={() => setCartOpen(true)}>
        <i className="fa-solid fa-bag-shopping"></i>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* OVERLAY */}
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />

      {/* CART PANEL */}
      <div className={`cart-panel${cartOpen ? ' open' : ''}`} id="cart-panel">
        <div className="cart-header">
          <h3><i className="fa-solid fa-bag-shopping" style={{ color: 'var(--primary)', marginRight: 8 }}></i>Keranjang</h3>
          <button className="cart-close" id="cart-close-btn" onClick={() => setCartOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="cart-order-type">
          <button id="order-dinein" className={`order-type-btn${orderType === 'dine-in' ? ' active' : ''}`} onClick={() => setOrderType('dine-in')}>
            <i className="fa-solid fa-utensils" style={{ marginRight: 6 }}></i>Makan di Tempat
          </button>
          <button id="order-takeaway" className={`order-type-btn${orderType === 'takeaway' ? ' active' : ''}`} onClick={() => setOrderType('takeaway')}>
            <i className="fa-solid fa-bag-shopping" style={{ marginRight: 6 }}></i>Bawa Pulang
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-bowl-food"></i>
              <p>Keranjang masih kosong</p>
              <p style={{ fontSize: '0.83rem', marginTop: 4 }}>Tambahkan menu favorit Anda</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatRupiah(item.price * item.qty)}</div>
                  <div className="cart-qty">
                    <button id={`qty-dec-${item.id}`} className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="qty-num">{item.qty}</span>
                    <button id={`qty-inc-${item.id}`} className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button className="cart-remove" id={`remove-${item.id}`} onClick={() => removeItem(item.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total Pesanan</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <button id="send-wa-btn" className="cart-whatsapp" onClick={sendWhatsApp}>
              <i className="fa-brands fa-whatsapp"></i>
              Kirim ke WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
