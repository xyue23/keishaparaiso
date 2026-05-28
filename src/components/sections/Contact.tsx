import { useEffect, useState } from "react";
// Make sure you have 'lucide-react' installed in your package.json!
import { Check, Loader2, Send, Hammer, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isSuccess) return;
        const timer = setTimeout(() => setIsSuccess(false), 5000);
        return () => clearTimeout(timer);
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData(e.currentTarget);

        try {
            const response: Response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setIsSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Failed to send message. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Using standard template literals for the button class to prevent any rendering crashes
    const buttonBaseClass = "w-full sm:w-auto text-zinc-950 font-semibold transition-all duration-300 shadow-md flex items-center justify-center";
    const buttonStateClass = isSuccess 
        ? "bg-emerald-400 hover:bg-emerald-500 shadow-emerald-500/10" 
        : "bg-[#ff87ab] hover:bg-[#ff9ebc] shadow-pink-500/10"; // Matches the pink in your screenshot

    return (
        <section className="w-full max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-bold tracking-tight text-white">Get in touch</h2>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#ff87ab]/30 bg-[#ff87ab]/10 px-3 py-1 text-xs font-medium text-[#ff87ab]">
                        <Hammer className="h-3 w-3" /> Let's create something
                    </span>
                </div>
                <p className="text-zinc-400 max-w-[600px] text-sm md:text-base">
                    Have a project in mind or just want to say hi? I'm currently open to new opportunities and collaborations.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#0a0a0a] p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-200 font-semibold">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="bg-[#111111] border-zinc-800 text-zinc-200 focus-visible:ring-[#ff87ab]/50 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-200 font-semibold">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="bg-[#111111] border-zinc-800 text-zinc-200 focus-visible:ring-[#ff87ab]/50 h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-zinc-200 font-semibold">Subject</Label>
                        <Select name="subject" required>
                            <SelectTrigger className="bg-[#111111] border-zinc-800 text-zinc-200 focus-visible:ring-[#ff87ab]/50 h-11">
                                <SelectValue placeholder="What's this about?" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111111] border-zinc-800 text-zinc-200">
                                <SelectItem value="collaboration">Collaboration / Project</SelectItem>
                                <SelectItem value="employment">Job Opportunity</SelectItem>
                                <SelectItem value="general">General Inquiry</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-zinc-200 font-semibold">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell me about your project details..."
                            required
                            rows={6}
                            className="bg-[#111111] border-zinc-800 text-zinc-200 focus-visible:ring-[#ff87ab]/50 resize-none"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 font-medium">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${buttonBaseClass} ${buttonStateClass}`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : isSuccess ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Message Sent!
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </>
                        )}
                    </Button>
                </form>

                {/* CV Integration Block */}
                <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-400 text-center sm:text-left">
                        Prefer a direct copy of my qualifications?
                    </p>
                    <Button
                        asChild
                        variant="outline"
                        className="border-[#ff87ab]/30 text-zinc-200 hover:bg-[#ff87ab]/10 hover:text-white transition-all duration-300 w-full sm:w-auto"
                    >
                        <a href="/Paraiso - CV.pdf" target="_blank" rel="noopener noreferrer" download>
                            <FileDown className="mr-2 h-4 w-4 text-[#ff87ab]" />
                            Download My CV
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
