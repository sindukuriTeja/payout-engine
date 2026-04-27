"""
Seed 3 merchants with credit history (simulated customer payments).
Idempotent — skips if merchants already exist.
"""

from django.core.management.base import BaseCommand
from django.utils import timezone

from ledger.models import LedgerEntry, Merchant


MERCHANTS = [
    {
        "name": "Acme Digital Agency",
        "email": "finance@acmedigital.in",
        "credits": [
            (250_000, "Invoice #1001 — Webflow project"),
            (175_000, "Invoice #1002 — Brand identity"),
            (320_000, "Invoice #1003 — Mobile app milestone 1"),
        ],
    },
    {
        "name": "Freelancer Pro (Priya S.)",
        "email": "priya@freelancerpro.in",
        "credits": [
            (85_000, "Contract #401 — Technical writing"),
            (120_000, "Contract #402 — API documentation"),
            (45_000, "Contract #403 — Blog series"),
        ],
    },
    {
        "name": "WebCraft Studios",
        "email": "payouts@webcraft.in",
        "credits": [
            (500_000, "Project Alpha — Phase 1"),
            (150_000, "Project Beta — Discovery"),
            (225_000, "Project Alpha — Phase 2"),
            (100_000, "Retainer — March 2025"),
        ],
    },
]


class Command(BaseCommand):
    help = "Seed merchants and credit history"

    def handle(self, *args, **options):
        for data in MERCHANTS:
            merchant, created = Merchant.objects.get_or_create(
                email=data["email"],
                defaults={"name": data["name"]},
            )

            if not created:
                self.stdout.write(f"  Merchant '{merchant.name}' already exists — skipping")
                continue

            self.stdout.write(f"  Created merchant: {merchant.name} ({merchant.id})")

            for amount, desc in data["credits"]:
                LedgerEntry.objects.create(
                    merchant=merchant,
                    entry_type=LedgerEntry.EntryType.CREDIT,
                    amount_paise=amount,
                    description=desc,
                )
                self.stdout.write(f"    + {amount}p — {desc}")

        self.stdout.write(self.style.SUCCESS("\nSeed complete."))
