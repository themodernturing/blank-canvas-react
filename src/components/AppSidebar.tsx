import { LayoutDashboard, Brain, ShieldCheck, FileText, TrendingUp, AlertTriangle, Clock, Mic, Mail, Languages, Handshake, DollarSign, Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Executive Command Center", url: "/", icon: LayoutDashboard },
  { title: "Strategy Assistant", url: "/strategy", icon: Brain },
  { title: "Risk Intelligence Hub", url: "/risk-compliance", icon: ShieldCheck },
  { title: "Predictive Intelligence Hub", url: "/predictive-analytics", icon: TrendingUp },
  { title: "Early Warning Center", url: "/early-warning", icon: AlertTriangle },
  { title: "AI Financial Command Deck", url: "/financial-command", icon: DollarSign },
  { title: "AI CFO Copilot", url: "/cfo-copilot", icon: Briefcase },
  { title: "Time Leverage Center", url: "/time-leverage", icon: Clock },
  { title: "AI Meeting Companion", url: "/meeting-companion", icon: Mic },
  { title: "AI Negotiation Co-Pilot", url: "/negotiation-copilot", icon: Handshake },
  { title: "AI Communications Director", url: "/communications", icon: Mail },
  { title: "Arabic Intelligence Hub", url: "/arabic-intelligence", icon: Languages },
  { title: "Reports & Exports", url: "/exports", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-6 py-8">
          <h1 className={`font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent transition-all ${collapsed ? "text-center" : ""}`}>
            {collapsed ? "O" : "ORBITAL"}
          </h1>
          {!collapsed && (
            <p className="text-muted-foreground text-xs mt-1">AI-Powered Executive Intelligence</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "text-center" : ""}>
            {collapsed ? "•" : "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
