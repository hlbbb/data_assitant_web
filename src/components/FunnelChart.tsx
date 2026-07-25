import './FunnelChart.css'

interface FunnelStep {
  label: string
  percent: number
}

const STEPS: FunnelStep[] = [
  { label: '曝光', percent: 100 },
  { label: '点击', percent: 45 },
  { label: '注册', percent: 13.5 },
  { label: '激活', percent: 3.4 },
  { label: '付费', percent: 0.27 },
  { label: '留存', percent: 0.016 },
]

const LINE_COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f97316']

const FunnelChart: React.FC = () => {
  return (
    <div className="funnel-chart">
      {STEPS.map((step, i) => {
        const nextPct = i < STEPS.length - 1
          ? ((STEPS[i + 1].percent / step.percent) * 100).toFixed(0)
          : null

        return (
          <div key={step.label} className="funnel-step">
            <div className="funnel-step__row">
              <span
                className="funnel-step__dot"
                style={{ borderColor: LINE_COLORS[i] }}
              />
              <span className="funnel-step__label">{step.label}</span>
              <span className="funnel-step__pct">{step.percent}%</span>
            </div>
            {nextPct && (
              <div className="funnel-step__connector">
                <div className="funnel-step__line" />
                <span className="funnel-step__conv">转化率 {nextPct}%</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FunnelChart
