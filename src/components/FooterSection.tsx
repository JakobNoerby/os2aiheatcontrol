const FooterSection = () => (
  <footer className="border-t border-border px-6 py-12 sm:px-12">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
        Open Source
      </div>
      <p>
        OS2 AI Heat Control er et fællesoffentligt kerneprodukt under{" "}
        <a
          href="https://os2.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          OS2
        </a>
        .
      </p>
      <p className="text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} OS2 — Det Offentlige Digitaliseringsfællesskab
      </p>
    </div>
  </footer>
);

export default FooterSection;
