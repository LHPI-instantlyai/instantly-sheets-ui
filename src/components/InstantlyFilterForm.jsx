import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampaignComboBox } from "./CampaignComboBox";
import { SheetsComboBox } from "./SheetsComboBox";
import { SheetsDrawerDialog } from "./SheetsDrawerDialog"; // adjust path if needed
import { useEffect, useState } from "react";
import StatusIndicator from "./custom/StatusIndicator";
import { useDispatch } from "react-redux";
import { startAgentEncoding } from "@/store/reducers/instantlyAiReducer";

export function InstantlyFilterForm({
  className,
  existingSheets,
  existingCampaigns,
  instantlyloader,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [loader, setLoader] = useState(true);
  const [openCampaign, setOpenCampaign] = useState(false);
  const [showOpts, setShowOpts] = useState(false);



  const dispatch = useDispatch()
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Default opts values
  const defaultOpts = {
    pageLimit: 100,
    emailsPerLead: 3,
    concurrency: 3,
    maxEmails: 100,
    maxPages: 50,
    aiInterestThreshold: 1,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const opts = {
      pageLimit: Number(form.pageLimit?.value || defaultOpts.pageLimit),
      emailsPerLead: Number(form.emailsPerLead?.value || defaultOpts.emailsPerLead),
      concurrency: Number(form.concurrency?.value || defaultOpts.concurrency),
      maxEmails: Number(form.maxEmails?.value || defaultOpts.maxEmails),
      maxPages: Number(form.maxPages?.value || defaultOpts.maxPages),
      aiInterestThreshold: Number(form.aiInterestThreshold?.value || defaultOpts.aiInterestThreshold),
    };
    const data = {
      campaignId: selectedIds,
      sheetName: selectedSheet,
      opts,
    };
    
    dispatch(startAgentEncoding({
      campaignId: selectedIds,
      sheetName: selectedSheet,
      opts,
    }))
    // You can replace the above with any further handling (API call, etc)
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      <Card className="md:w-[500px] w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black">
            Instantly<span className="italic pr-1">Sheet </span>{" "}
          </CardTitle>
          <CardDescription className={"text-xs"}>
            Add filters for migration (instantly.ai - sheets)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Instantly to Google sheets
                </span>
              </div>
             
              <div className="grid gap-6">
                <div className="grid gap-3 relative">
                  <Label htmlFor="">Campaign</Label>
                  <CampaignComboBox
                    existingCampaigns={existingCampaigns}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    instantlyloader={instantlyloader}
                    openCampaign={openCampaign}
                    setOpenCampaign={setOpenCampaign}
                  />
                </div>
                <div className="grid gap-3 ">
                  <Label htmlFor="">Google Sheets(Destination)</Label>
                  <div className="flex justify-between gap-2">
                    <div className="w-full">
                      <SheetsComboBox
                        existingSheets={existingSheets}
                        selectedSheet={selectedSheet}
                        setSelectedSheet={setSelectedSheet}
                      />
                    </div>
                    <SheetsDrawerDialog open={open} setOpen={setOpen} />
                  </div>
                </div>

                {/* Toggle button for opts */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => setShowOpts((v) => !v)}
                >
                  {showOpts ? "Hide Advanced Options" : "Show Advanced Options"}
                </Button>
                {showOpts && (
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="pageLimit">Page Limit</Label>
                      <Input
                        id="pageLimit"
                        name="pageLimit"
                        type="number"
                        min="1"
                        defaultValue={100}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="emailsPerLead">Emails Per Lead</Label>
                      <Input
                        id="emailsPerLead"
                        name="emailsPerLead"
                        type="number"
                        min="1"
                        defaultValue={3}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="concurrency">Concurrency</Label>
                      <Input
                        id="concurrency"
                        name="concurrency"
                        type="number"
                        min="1"
                        defaultValue={3}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="maxEmails">Max Emails</Label>
                      <Input
                        id="maxEmails"
                        name="maxEmails"
                        type="number"
                        min="1"
                        defaultValue={100}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="maxPages">Max Pages</Label>
                      <Input
                        id="maxPages"
                        name="maxPages"
                        type="number"
                        min="1"
                        defaultValue={50}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="aiInterestThreshold">
                        AI Interest Threshold
                      </Label>
                      <Input
                        id="aiInterestThreshold"
                        name="aiInterestThreshold"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={1}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full text-base font-bold py-5 hover:cursor-pointer "
                >
                  {loader ? (
                    <div className="flex justify-center items-center gap-1">
                      Migrating ...
                      <lord-icon
                        src="https://cdn.lordicon.com/aceczzap.json"
                        trigger="loop"
                        delay="2000"
                        colors="primary:#171717"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </div>
                  ) : (
                    <div className=""> Start Data Migration</div>
                  )}
                </Button>
              </div>
              {/* <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
