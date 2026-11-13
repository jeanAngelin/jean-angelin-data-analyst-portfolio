from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "screenshots"
OUT.mkdir(exist_ok=True)
errors = []

def reveal_full_page(page):
    for element in page.locator(".reveal").all():
        element.scroll_into_view_if_needed()
        page.wait_for_timeout(40)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(100)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1, reduced_motion="reduce")
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto("http://127.0.0.1:5173/", wait_until="networkidle")
    page.screenshot(path=str(OUT / "00-home-hero.png"))
    page.screenshot(path=str(OUT / "01-home.png"), full_page=True)
    assert page.get_by_role("heading", name="Jean Angelin ANDRIAMANANTENA").is_visible()
    assert page.locator(".hero-actions button").is_disabled()
    assert page.locator(".hero-visual img").evaluate("img => img.complete && img.naturalWidth > 0")
    reveal_full_page(page)
    page.get_by_role("link", name="Voir l’étude de cas").click()
    page.wait_for_url("**/projects/madastore")
    page.wait_for_load_state("networkidle")
    page.locator(".gallery-item").first.wait_for()
    assert page.get_by_role("heading", name="MadaStore Sales Analytics").is_visible()
    assert page.locator(".gallery-item").count() == 7
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "02-madastore-case.png"), full_page=True)
    page.goto("http://127.0.0.1:5173/admin", wait_until="networkidle")
    assert page.locator(".admin-warning").is_visible()
    name_field = page.locator(".admin-form input").first
    name_field.fill("Jean Angelin ANDRIAMANANTENA Test")
    page.get_by_role("button", name="Enregistrer dans ce navigateur").click()
    page.reload(wait_until="networkidle")
    assert page.locator(".admin-form input").first.input_value() == "Jean Angelin ANDRIAMANANTENA Test"
    page.get_by_role("button", name="Revenir au contenu du projet").click()
    page.wait_for_load_state("networkidle")
    assert page.locator(".admin-form input").first.input_value() == "Jean Angelin ANDRIAMANANTENA"
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "03-admin.png"), full_page=True)
    page.goto("http://127.0.0.1:5173/", wait_until="networkidle")
    page.get_by_role("button", name="Switch to English").click()
    assert page.get_by_role("heading", name="Jean Angelin ANDRIAMANANTENA").is_visible()
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "04-home-en.png"), full_page=True)
    page.get_by_role("button", name="Toggle theme").click()
    assert page.locator("html").get_attribute("data-theme") == "dark"
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "05-home-dark.png"), full_page=True)
    page.set_viewport_size({"width": 390, "height": 844})
    page.reload(wait_until="networkidle")
    page.get_by_role("button", name="Open menu").click()
    assert page.get_by_role("navigation", name="Main navigation").is_visible()
    page.get_by_role("button", name="Close menu").click()
    overflow = page.locator("body").evaluate("el => ({width: el.scrollWidth, viewport: window.innerWidth, offenders: [...el.querySelectorAll('*')].map(e => ({tag:e.tagName, cls:typeof e.className === 'string' ? e.className : '', x:Math.round(e.getBoundingClientRect().x), right:Math.round(e.getBoundingClientRect().right), w:Math.round(e.getBoundingClientRect().width)})).filter(e => e.x < 0 || e.right > window.innerWidth + 1).slice(0,12)})")
    assert overflow["width"] <= overflow["viewport"], overflow
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "06-home-mobile.png"), full_page=True)
    page.goto("http://127.0.0.1:5173/projects/madastore", wait_until="networkidle")
    assert page.locator("body").evaluate("el => el.scrollWidth <= window.innerWidth")
    reveal_full_page(page)
    page.screenshot(path=str(OUT / "07-case-mobile.png"), full_page=True)
    browser.close()

if errors:
    raise SystemExit("Browser errors: " + " | ".join(errors))
print("OK: home, case, admin, English, dark mode, mobile; no page errors or horizontal overflow.")
