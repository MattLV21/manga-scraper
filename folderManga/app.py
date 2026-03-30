import json
from reader import get_redirect_urls_from_folder


with open("folderManga/config.json", "r") as f:
    content = f.read()
    p = json.loads(content)

path = p["path"]

files = get_redirect_urls_from_folder(path)

import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk

# Create main window
root = tk.Tk()
root.title("Modern TTK Grid App with Pagination")
root.geometry("900x700")
root.configure(bg="#f2f2f2")

# Use a modern ttk theme
style = ttk.Style()
style.theme_use("clam")

# --- Create Sample Data ---
total_items = 36  # total number of cards
items_per_page = 12
current_page = 0  # track which set of cards we’re on

items = [{"title": f"Item {i+1}", "button": "Open"} for i in range(total_items)]

# --- Image Placeholder Generator ---
def create_placeholder_image(color, size=(100, 100)):
    img = Image.new("RGB", size, color)
    return ImageTk.PhotoImage(img)

colors = ["#ff9999", "#99ff99", "#9999ff", "#ffcc99", "#cccccc", "#ff99cc"]
images = [create_placeholder_image(colors[i % len(colors)]) for i in range(total_items)]

# --- Function: Open Detail Window ---
def open_detail_window(title):
    detail = tk.Toplevel(root)
    detail.title(title)
    detail.geometry("400x300")
    ttk.Label(detail, text=f"You opened {title}!", font=("Segoe UI", 16, "bold")).pack(pady=40)
    ttk.Button(detail, text="Close", command=detail.destroy).pack(pady=20)

# --- Main Frame for Cards ---
main_frame = ttk.Frame(root, padding=10)
main_frame.pack(fill="both", expand=True)

# --- Frame for Navigation Buttons ---
nav_frame = ttk.Frame(root, padding=10)
nav_frame.pack(side="bottom", pady=10)

# --- Function: Display Cards for Current Page ---
def display_cards():
    # Clear previous cards
    for widget in main_frame.winfo_children():
        widget.destroy()

    start_index = current_page * items_per_page
    end_index = start_index + items_per_page
    page_items = items[start_index:end_index]

    for idx, item in enumerate(page_items):
        frame = ttk.Frame(main_frame, padding=10, relief="raised")
        frame.grid(row=idx // 4, column=idx % 4, padx=10, pady=10, sticky="nsew")

        # Clickable frame
        frame.bind("<Button-1>", lambda e, t=item["title"]: open_detail_window(t))

        # Image
        img_label = ttk.Label(frame, image=images[start_index + idx])
        img_label.image = images[start_index + idx]
        img_label.pack()
        img_label.bind("<Button-1>", lambda e, t=item["title"]: open_detail_window(t))

        # Title
        title_label = ttk.Label(frame, text=item["title"], font=("Segoe UI", 10, "bold"))
        title_label.pack(pady=(5, 2))
        title_label.bind("<Button-1>", lambda e, t=item["title"]: open_detail_window(t))

        # Button
        btn = ttk.Button(frame, text=item["button"], command=lambda t=item["title"]: open_detail_window(t))
        btn.pack(pady=(2, 5))

    # Adjust grid responsiveness
    for i in range(4):
        main_frame.columnconfigure(i, weight=1)
    for i in range(3):
        main_frame.rowconfigure(i, weight=1)

# --- Pagination Controls ---
def next_page():
    global current_page
    if (current_page + 1) * items_per_page < total_items:
        current_page += 1
        display_cards()

def prev_page():
    global current_page
    if current_page > 0:
        current_page -= 1
        display_cards()

# --- Navigation Buttons (with arrows) ---
prev_btn = ttk.Button(nav_frame, text="◀ Previous", command=prev_page)
next_btn = ttk.Button(nav_frame, text="Next ▶", command=next_page)
prev_btn.pack(side="left", padx=20)
next_btn.pack(side="right", padx=20)

# --- Initial Display ---
display_cards()

root.mainloop()
