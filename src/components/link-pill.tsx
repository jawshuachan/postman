export default function LinkPill({ href, icon, children }: { href:string; icon: React.ReactNode; children:React.ReactNode}) {
    return(
        <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-3xl border bg-card px-8 py-2 text-sm">
          { icon }
          <a
            className="hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        </div>
      </div>
    );
}