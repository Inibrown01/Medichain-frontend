import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'

export function AdminPlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} subtitle="This admin section is ready for the next design batch." />
      <Card className="rounded-3xl p-8">
        <p className="text-sm font-medium text-brand-muted">
          Navigation and shell are wired. Content will be added when you share the next Figma screens.
        </p>
      </Card>
    </>
  )
}
