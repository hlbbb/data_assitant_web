import './ProgressBar.css';

interface ProgressBarProps {
  percent: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, label }) => {
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <div className="progress-bar">
      {label && <span className="progress-bar__label">{label}</span>}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
      <span className="progress-bar__percent">{clampedPercent}%</span>
    </div>
  );
};

export default ProgressBar;
