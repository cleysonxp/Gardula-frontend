export function AuthVisual() {
    return (
        <div className="relative flex h-full min-h-screen items-center justify-center overflow-hidden bg-primary-700 p-12 text-white">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />

            <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-primary-500/30 blur-3xl" />

            <div className="relative z-10 max-w-lg">
                <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">
                    Finora
                </span>

                <h1 className="mt-6 text-5xl font-bold tracking-tight">
                    Organize seu dinheiro.
                    <br />
                    Planeje seu futuro.
                </h1>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                    Tenha uma visão clara das suas finanças e transforme seus objetivos
                    em planos.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs text-white/60">Saldo</p>
                        <p className="mt-2 font-semibold">R$ 8.420</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs text-white/60">Economizado</p>
                        <p className="mt-2 font-semibold">R$ 1.240</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs text-white/60">Meta</p>
                        <p className="mt-2 font-semibold">72%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}