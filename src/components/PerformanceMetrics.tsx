interface MetricsProps {
  metrics: string;
}

export default function PerformanceMetrics({ metrics }: MetricsProps) {
  const metricItems = metrics.split(',').map(item => item.trim());
  
  return (
    <div className="metrics-container">
      <h4>📊 Impact Metrics</h4>
      <ul className="metrics-list">
        {metricItems.map((metric, index) => (
          <li key={index} className="metric-item">
            {metric}
          </li>
        ))}
      </ul>
    </div>
  );
}