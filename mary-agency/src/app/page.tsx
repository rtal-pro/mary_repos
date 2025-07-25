import React from "react";

export default async function HomePage(): Promise<React.JSX.Element> {
  return (
    <main className="min-h-screen">
      <section className="h-screen flex items-center justify-center bg-primary text-secondary">
        <div className="text-center">
          <h1 className="text-hero font-display font-bold mb-6">
            Mary Agency
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-balance">
            Premium communication agency specializing in digital creation, 
            film production, and web development
          </p>
        </div>
      </section>
    </main>
  );
}
