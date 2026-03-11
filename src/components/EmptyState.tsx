import { FileText, Map, ClipboardList, Database, Layout, Package, Boxes, Palette, PanelLeft, BookImage, FolderOpen, FileImage, Type } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CopyButton } from '@/components/CopyButton'

type EmptyStateType = 'overview' | 'roadmap' | 'spec' | 'data' | 'screen-designs' | 'data-shape' | 'brand-guide' | 'design-system' | 'shell' | 'export'

interface EmptyStateProps {
  type: EmptyStateType
  sectionName?: string
}

const config: Record<EmptyStateType, {
  icon: typeof FileText
  title: string
  agent: string
  starter: string | ((name?: string) => string)
  description: string
}> = {
  overview: {
    icon: FileText,
    title: 'No product defined yet',
    agent: '@product-vision',
    starter: 'Let\'s define my product vision',
    description: 'Define your product vision, key problems, and features',
  },
  roadmap: {
    icon: Map,
    title: 'No roadmap defined yet',
    agent: '@product-roadmap',
    starter: 'Create my product roadmap',
    description: 'Break down your product into development sections',
  },
  spec: {
    icon: ClipboardList,
    title: 'No specification defined yet',
    agent: '@shape-section',
    starter: (name?: string) => name ? `Let's shape the ${name} section` : 'Let\'s shape this section',
    description: 'Define the user flows and UI requirements',
  },
  data: {
    icon: Database,
    title: 'No sample data generated yet',
    agent: '@sample-data',
    starter: (name?: string) => name ? `Generate sample data for the ${name} section` : 'Generate sample data for this section',
    description: 'Create realistic sample data for screen designs',
  },
  'screen-designs': {
    icon: Layout,
    title: 'No screen designs created yet',
    agent: '@design-screen',
    starter: (name?: string) => name ? `Create a screen design for the ${name} section` : 'Create a screen design for this section',
    description: 'Create screen designs for this section',
  },
  'data-shape': {
    icon: Boxes,
    title: 'No data shape defined yet',
    agent: '@data-shape',
    starter: 'Define the data shape for my product',
    description: 'Sketch out the general shape of your product\'s data',
  },
  'brand-guide': {
    icon: BookImage,
    title: 'No brand guide created yet',
    agent: '@brand-guide',
    starter: 'Create a brand guide from my resources',
    description: 'Import and analyze brand assets for consistent design',
  },
  'design-system': {
    icon: Palette,
    title: 'No design tokens defined yet',
    agent: '@design-tokens',
    starter: 'Help me choose colors and fonts',
    description: 'Choose colors and typography for your product',
  },
  shell: {
    icon: PanelLeft,
    title: 'No application shell designed yet',
    agent: '@design-shell',
    starter: 'Design the application shell',
    description: 'Design the navigation and layout',
  },
  export: {
    icon: Package,
    title: 'Ready to export',
    agent: '@export-product',
    starter: 'Export the product design package',
    description: 'Generate the complete handoff package',
  },
}

export function EmptyState({ type, sectionName }: EmptyStateProps) {
  const { icon: Icon, title, agent, starter: starterConfig, description } = config[type]
  const starter = typeof starterConfig === 'function' ? starterConfig(sectionName) : starterConfig

  return (
    <Card className="border-stone-200 dark:border-stone-700 shadow-sm border-dashed">
      <CardContent className="py-8">
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-stone-600 dark:text-stone-400 mb-1">
            {title}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            {description}
          </p>
          <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 w-full space-y-2">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">
                Select Copilot agent:
              </p>
              <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
                {agent}
              </code>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-700 pt-2">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Then say:
                </p>
                <CopyButton text={starter} />
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-300 italic">
                "{starter}"
              </p>
            </div>
          </div>

          {/* Brand resources hint - only for brand-guide type */}
          {type === 'brand-guide' && (
            <div className="mt-4 w-full">
              <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-md px-4 py-3">
                <div className="flex items-start gap-3">
                  <FolderOpen className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-0.5 shrink-0" />
                  <div className="space-y-2 text-left">
                    <div>
                      <p className="text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">
                        Optional: Add brand resources first
                      </p>
                      <code className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                        product/brand-guide/resources/
                      </code>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
                      <p className="font-medium text-stone-600 dark:text-stone-300">What to add:</p>
                      <ul className="space-y-0.5 ml-1">
                        <li className="flex items-center gap-1.5">
                          <FileImage className="w-3 h-3" />
                          <span>Logos (SVG, PNG)</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          <span>Style guides, brand docs (PDF, images)</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Palette className="w-3 h-3" />
                          <span>Color palettes, mood boards</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Type className="w-3 h-3" />
                          <span>Font files (TTF, OTF, WOFF)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
