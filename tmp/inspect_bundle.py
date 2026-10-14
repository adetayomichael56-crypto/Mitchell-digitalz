import re
import json

with open("/tmp/bundle.js", "r") as f:
    content = f.read()

images = list(set(re.findall(r'https://res\.cloudinary\.com/[^"\'\s)]+', content)))
print("Found", len(images), "Cloudinary images:")
for img in sorted(images):
    print(" -", img)

# Find social links, emails, phone numbers
urls = list(set(re.findall(r'https?://[a-zA-Z0-9\.\-_/]+', content)))
socials = [u for u in urls if any(k in u for k in ['wa.me', 'calendly', 'instagram', 'linkedin', 'github', 'upwork', 'contra', 'behance'])]
print("\nSocial / links:")
for s in sorted(socials):
    print(" -", s)
