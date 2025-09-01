import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/generator/ModeToggle";
import { PersonaSelect } from "@/components/generator/PersonaSelect";
import { NarrativePills } from "@/components/generator/NarrativePills";
import { TickerInput } from "@/components/generator/TickerInput";
import { CopeSlider } from "@/components/generator/CopeSlider";
import { LengthRadio } from "@/components/generator/LengthRadio";
import { FlagToggles } from "@/components/generator/FlagToggles";
import { CopyButtons } from "@/components/generator/CopyButtons";
import { ExportButton } from "@/components/generator/ExportButton";
import { SpinButton } from "@/components/generator/SpinButton";
import { Thread } from "@/components/preview/Thread";
import { SummaryCard } from "@/components/preview/SummaryCard";
import { AsciiChart } from "@/components/preview/AsciiChart";

export default function Page() {
  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-12">
      <section className="py-10 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ShillGospel — Daily sermons of pure hopium.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Twist the Cope Dial™ from plausible to full lies</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ModeToggle />
            <PersonaSelect />
            <NarrativePills />
            <TickerInput />
            <CopeSlider />
            <LengthRadio />
            <FlagToggles />
            <SpinButton />
            <CopyButtons />
            <ExportButton />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Thread />
            </CardContent>
          </Card>
          <SummaryCard />
          <AsciiChart />
        </div>
      </section>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        Satire tool. Don&apos;t build a personality cult, build something cool.
      </footer>
    </div>
  );
}
