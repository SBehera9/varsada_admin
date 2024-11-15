import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
  };

export default function PageLayout({ children }: Props) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}