import Link from "next/link";
import { InstagramIcon, FacebookIcon, XIcon } from "@/components/ui/SocialIcons";
import { categories } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-ivory">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h2 className="font-display text-2xl tracking-[0.15em] uppercase mb-4">
            HUSSAIN
          </h2>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            A modern luxury perfume house crafting rare, considered
            fragrances for every identity.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
              <InstagramIcon width={18} height={18} />
            </a>
            <a href="#" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity">
              <FacebookIcon width={18} height={18} />
            </a>
            <a href="#" aria-label="X (Twitter)" className="opacity-70 hover:opacity-100 transition-opacity">
              <XIcon width={18} height={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxe opacity-50 mb-4">
            Shop
          </h3>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/products?category=${c.value}`}
                  className="opacity-80 hover:opacity-100 hover:text-champagne transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxe opacity-50 mb-4">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/#brand-story" className="opacity-80 hover:opacity-100 hover:text-champagne transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/account" className="opacity-80 hover:opacity-100 hover:text-champagne transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="opacity-80 hover:opacity-100 hover:text-champagne transition-colors">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="opacity-80 hover:opacity-100 hover:text-champagne transition-colors">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-luxe opacity-50 mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li><span className="opacity-80">Shipping &amp; Returns</span></li>
            <li><span className="opacity-80">Fragrance Finder</span></li>
            <li><span className="opacity-80">Gift Cards</span></li>
            <li><span className="opacity-80">Contact Us</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50">
          <p>© {year} HUSSAIN. All rights reserved.</p>
          <p>Crafted with care, worn with confidence.</p>
        </div>
      </div>
    </footer>
  );
}
