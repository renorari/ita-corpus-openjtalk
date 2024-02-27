import cp from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("labels")) fs.mkdirSync("labels");
if (!fs.existsSync("labels/full")) fs.mkdirSync("labels/full");
if (!fs.existsSync("labels/mono")) fs.mkdirSync("labels/mono");

fs.readFileSync("emotion_transcript_utf8.txt", "utf8").split("\n").forEach((line) => {
    if (!line.startsWith("EMOTION")) return;
    const title = line.split(":")[0];
    const content = line.split(":")[1].split(",")[0];
    cp.execSync(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/mei/mei_normal.htsvoice --output_type full_context_label ${content} > labels/full/${title}.lab`).toString();
    cp.execSync(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/mei/mei_normal.htsvoice --output_type phoneme ${content} > labels/mono/${title}.lab`).toString();
});