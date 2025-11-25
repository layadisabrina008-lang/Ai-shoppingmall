'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const tabs = [
{ href: '/', label: 'Plaza' },
{ href: '/cloth', label: 'Cloth' },
{ href: '/beauty', label: 'Beauty' },
{ href: '/food', label: 'Food' },
{ href: '/travel', label: 'Travel' },
{ href: '/about', label: 'About' }
]

export function Header() {
const path = usePathname()
return (
<header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-black/50 backdrop-blur">
<div className="container flex items-center justify-between h-14">
<Link href="/" className="font-semibold text-brand-600">Nova Mall</Link>
<nav className="flex gap-5">
{tabs.map(t => (
<Link key={t.href} href={t.href}
className={clsx(
'text-sm hover:text-brand-600 transition',
path===t.href && 'text-brand-600 font-medium'
)}>
{t.label}
</Link>
))}
</nav>
</div>
</header>
)
}
