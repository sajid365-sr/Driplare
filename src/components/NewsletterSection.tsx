
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", role: "" });
    // You would typically send this data to your backend here
  };

  return (
    <section id="newsletter" className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Role
              </label>
              <Select onValueChange={handleRoleChange} value={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="project-manager">Project Manager</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
