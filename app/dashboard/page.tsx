import { DashboardService } from "../modules/dashboard/dashboard.service";

export default function Home() {
    const dashboardService = new DashboardService();
    
    return (
        <h1>{dashboardService.title}</h1>
    )
}