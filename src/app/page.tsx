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
    <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>ShillGospel — Daily sermons of pure hopium</CardTitle>
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
    </main>
  );
}
