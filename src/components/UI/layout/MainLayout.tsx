import PageLayout from "./PageLayout";
import SideNav from "./SideNav";

type Props = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="grid grid-cols-[20%_80%] h-full">
                <SideNav />
                <div className="overflow-auto h-full">
                    <PageLayout>
                        {children}
                    </PageLayout>
                </div>
            </div>
        </div>
    )
}
