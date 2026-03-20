const FooterSection = () => (
  <footer className="border-t border-os2-grey px-6 py-14 sm:px-12">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2 rounded-full border border-os2-grey bg-os2-surface px-3 py-1 text-xs font-medium">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-os2-mint" />
        Open Source
      </div>
      <p>
        OS2 AI Heat Control er et fællesoffentligt kerneprodukt under{" "}
        <a
          href="https://os2.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-3 hover:underline"
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
