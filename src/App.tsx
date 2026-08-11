function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="rounded-2xl bg-surface p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-primary-600">
          Finora
        </h1>

        <p className="mt-2 text-text-muted">
          Personal Finance Management
        </p>

        <button className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white transition hover:bg-primary-700">
          Começar
        </button>
      </div>
    </main>
  )
}

export default App
