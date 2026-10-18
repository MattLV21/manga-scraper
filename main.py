from Elftoon import Elftoonscraper as elftoon
from Asmotoon import AsmotoonScraper as asmotoon
from Asurascans import AsurascansScraper as asurascans

elf = elftoon()
elf.scrape()

asm = asmotoon()
asm.scrape()

asura = asurascans()
asura.scrape()