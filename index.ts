import cp from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("emotion-labels")) fs.mkdirSync("emotion-labels");
if (!fs.existsSync("emotion-labels/full")) fs.mkdirSync("emotion-labels/full");
if (!fs.existsSync("emotion-labels/mono")) fs.mkdirSync("emotion-labels/mono");

fs.readFileSync("emotion_transcript_utf8.txt", "utf8").split("\n").forEach((line) => {
    if (!line.startsWith("EMOTION")) return;
    const title = line.split(":")[0];
    const content = line.split(":")[1].split(",")[0];
    cp.exec(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/m100/nitech_jp_atr503_m001.htsvoice --output_type full_context_label ${content} > emotion-labels/full/${title}.lab`).toString();
    cp.exec(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/m100/nitech_jp_atr503_m001.htsvoice --output_type phoneme ${content} > emotion-labels/mono/${title}.lab`).toString();
});

if (!fs.existsSync("recitation-labels")) fs.mkdirSync("recitation-labels");
if (!fs.existsSync("recitation-labels/full")) fs.mkdirSync("recitation-labels/full");
if (!fs.existsSync("recitation-labels/mono")) fs.mkdirSync("recitation-labels/mono");

fs.readFileSync("recitation_transcript_utf8.txt", "utf8").split("\n").forEach((line) => {
    if (!line.startsWith("RECITATION")) return;
    const title = line.split(":")[0];
    const content = line.split(":")[1].split(",")[0];
    cp.exec(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/m100/nitech_jp_atr503_m001.htsvoice --output_type full_context_label ${content} > recitation-labels/full/${title}.lab`).toString();
    cp.exec(`openjtalk_label_getter --dict_path /opt/homebrew/opt/open-jtalk/dic --htsvoice_path /opt/homebrew/opt/open-jtalk/voice/m100/nitech_jp_atr503_m001.htsvoice --output_type phoneme ${content} > recitation-labels/mono/${title}.lab`).toString();
});
