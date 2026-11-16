import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def iter_html_files():
    for path in ROOT.rglob('*.html'):
        if '.git' in path.parts:
            continue
        yield path


class HtmlSemanticsTests(unittest.TestCase):
    def test_all_html_has_required_structure(self):
        for file in iter_html_files():
            html = file.read_text(encoding='utf-8')
            self.assertRegex(html, r'<!DOCTYPE html>', msg=f'{file.relative_to(ROOT)} missing doctype')
            self.assertRegex(html, r'<html\b', msg=f'{file.relative_to(ROOT)} missing <html> tag')
            self.assertRegex(html, r'<head\b', msg=f'{file.relative_to(ROOT)} missing <head> tag')
            self.assertRegex(html, r'<body\b', msg=f'{file.relative_to(ROOT)} missing <body> tag')

    def test_dropdown_pages_include_shared_script(self):
        dropdown_files = []
        for file in iter_html_files():
            html = file.read_text(encoding='utf-8')
            if re.search(r'<button\b[^>]*class=["\']dropdown["\']', html):
                dropdown_files.append(file)

        self.assertTrue(dropdown_files, 'No dropdown menu pages were found')
        for file in dropdown_files:
            html = file.read_text(encoding='utf-8')
            self.assertIn('site.js', html, f'{file.relative_to(ROOT)} missing shared site.js include')

    def test_no_button_wraps_an_anchor(self):
        for file in iter_html_files():
            html = file.read_text(encoding='utf-8')
            self.assertNotRegex(html, r'<button\b[^>]*>\s*<a\s+', f'{file.relative_to(ROOT)} contains a button wrapping an anchor')

    def test_game_section_rolls_up_lists_properly(self):
        game_section = ROOT / 'GameSection.html'
        html = game_section.read_text(encoding='utf-8')

        self.assertRegex(html, r'<div\s+class=["\']content["\']>\s*<ul>', 'GameSection should wrap each content list in a ul')
        self.assertNotRegex(html, r'<div\s+class=["\']content["\']>\s*<li>', 'GameSection should not have raw li tags directly in the content container')

    def test_live_games_use_anchor_return_links(self):
        live_game_files = [
            path for path in iter_html_files()
            if 'Games/LiveGames/' in str(path.relative_to(ROOT)) or 'Games\\LiveGames\\' in str(path.relative_to(ROOT))
        ]

        self.assertTrue(live_game_files, 'No live game pages were found')
        for file in live_game_files:
            html = file.read_text(encoding='utf-8')
            if 'Return' in html:
                self.assertNotRegex(html, r'<button\b[^>]*class=["\']dropdown["\'][^>]*>\s*<a\s+', f'{file.relative_to(ROOT)} still has a button-wrapped return link')
                self.assertRegex(html, r'<a\b[^>]*class=["\']dropdown["\'][^>]*\s*href=', f'{file.relative_to(ROOT)} should use an anchor return link')


if __name__ == '__main__':
    unittest.main()
