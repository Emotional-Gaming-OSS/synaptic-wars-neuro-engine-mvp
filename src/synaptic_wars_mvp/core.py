from __future__ import annotations
from typing import Optional


def add(a: int, b: int) -> int:
    return a + b


def safe_divide(a: float, b: float) -> Optional[float]:
    if b == 0:
        return None
    return a / b
