import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar } from '@/components/settings/sidebar';
import { MobileHeader } from '@/components/settings/mobile-header';
import { ConnectedEmail } from '@/components/settings/connected-email';
import { ActiveRoles } from '@/components/settings/active-roles';
import { UserRolesTable } from '@/components/settings/user-roles-table';
import { mockUserRoles, mockActiveRoles } from '@/lib/mock-data';

export default function Home() {
  const tabItems = [
    { value: 'my-details', label: 'My details' },
    { value: 'profile', label: 'Profile' },
    { value: 'password', label: 'Password' },
    { value: 'team', label: 'Team' },
    { value: 'plan', label: 'Plan' },
    { value: 'roles', label: 'Roles' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'integrations', label: 'Integrations' },
    { value: 'api', label: 'API' },
  ];
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileHeader />

        <main className="flex-1 overflow-y-auto">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="mb-3">
              <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Settings</h1>
              <p className="text-sm text-muted-foreground">
                Manage your team and preferences here.
              </p>
            </div>

          
            <Tabs defaultValue="roles" className="space-y-6">
              <div className="border-border overflow-x-auto">
                <TabsList className="inline-flex w-fit items-center justify-center bg-transparent p-0">
                  {tabItems.map((tab, idx) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-4 py-3 border border-border -ml-px first:ml-0 data-[state=active]:bg-[#F9FAFB] data-[state=active]:text-foreground"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="roles" className="space-y-6 ">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-2 ">
                    <h2 className="text-xl font-semibold">User Roles</h2>
                    <p className="text-sm text-muted-foreground border-border border-b pb-2 ">
                      Update your roles details and information.
                    </p>

                    <ConnectedEmail />
                  </div>
                </div>

                <ActiveRoles roles={mockActiveRoles} />

                <UserRolesTable roles={mockUserRoles} />
              </TabsContent>

              {tabItems
                .filter((t) => t.value !== 'roles')
                .map((t) => (
                  <TabsContent key={t.value} value={t.value}>
                    <div className="text-center py-12 text-muted-foreground">
                      {t.label} content coming soon...
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
