export function Footer() {
return (
<footer className="mt-16">
<div className="hr-gold" />
<div className="container mx-auto px-4 py-6 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
<div>© {new Date().getFullYear()} NovaVerse AI Mall</div>
<div className="flex gap-4">
<a className="hover:text-gold" href="/about">About</a>
<a className="hover:text-gold" href="/privacy">Privacy</a>
<a className="hover:text-gold" href="/terms">Terms</a>
</div>
</div>
</footer>
);
}