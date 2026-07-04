import MockPatientHeader from "./MockPatientHeader";
import MockKeyMetrics from "./MockKeyMetrics";
import MockSeverityTrend from "./MockSeverityTrend";
import MockFrequencyChart from "./MockFrequencyChart";
import MockMedicationAdherence from "./MockMedicationAdherence";
import MockEventTimeline from "./MockEventTimeline";

export default function GPDashboardMockup() {
  return (
    <div className="bg-white" aria-hidden="true">
      <MockPatientHeader />
      <div className="space-y-4 p-4" style={{ backgroundColor: "#F3F1F8" }}>
        <MockKeyMetrics />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <MockSeverityTrend />
          </div>
          <MockFrequencyChart />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MockMedicationAdherence />
          <MockEventTimeline />
        </div>
      </div>
    </div>
  );
}
