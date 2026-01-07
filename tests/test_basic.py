from synaptic_wars_mvp import add, safe_divide


def test_add():
    assert add(2, 3) == 5


def test_safe_divide_zero():
    assert safe_divide(1, 0) is None
