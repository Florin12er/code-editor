import { Footer } from "./_componets/Footer";
import { Header } from "./_componets/Header";
import { Navbar } from "./_componets/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-16">
        <div className="container text-center mx-auto">
          <Header />
        </div>
      </main>
      <Footer />
    </div>
  );
}
