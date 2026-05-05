// app/studio/page.tsx
import UploadZone from '@/components/UploadZone'
import EngineSelector from '@/components/EngineSelector'
import ActionLog from '@/components/ActionLog'
import PreviewPanel from '@/components/PreviewPanel'

export default function StudioPage() {
  return (
    <main className="grid md:grid-cols-2 gap-6 p-4 min-h-screen bg-white dark:bg-zinc-900">
      <section className="space-y-4">
        <UploadZone maxFiles={10} maxSizeMB={6} />
        <EngineSelector />
      </section>
      <section className="space-y-4">
        <PreviewPanel />
        <ActionLog />
      </section>
    </main>
  )
}