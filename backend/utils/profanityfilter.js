const profanityList = (() => {
  const baseProfanityList = JSON.parse(
    atob(
      "WyJhbmFsIiwiYW51cyIsImFyc2UiLCJhcnNlZmFjZSIsImFyc2VoZWFkIiwiYXJzZWhvbGUiLCJhc3MiLCJhc3NiYW5kaXQiLCJhc3NoYXQiLCJhc3Nob2xlIiwiYXNzd2lwZSIsImJhZGFzcyIsImJhbGxzIiwiYmFsbHNhY2siLCJiYXN0YXJkIiwiYmVoZW5jaG9kIiwiYmV5b3RjaCIsImJoZW5jaG9kIiwiYmhvc2FkaSIsImJob3NkaWtlIiwiYmlhdGNoIiwiYml0Y2giLCJiaXRjaHkiLCJibG9vZHkiLCJibG93IGpvYiIsImJsb3dqb2IiLCJib2xsb2NrIiwiYm9sbG9ja3MiLCJib2xsb2siLCJib25lciIsImJvb2IiLCJidWdnZXIiLCJidWxsc2hpdCIsImJ1bSIsImJ1dHQiLCJidXR0cGx1ZyIsImNhYnJvbiIsImNoYW1hYWFyIiwiY2hhbWFhciIsImNoaWxkLWZ1Y2tlciIsImNoaW5nYWRhIiwiY2hpbmdhciIsImNoaW5rIiwiY2hvZCIsImNob2RkIiwiY2hvb3QiLCJjaHUiLCJjaHVkbmUiLCJjaHVkbmV5IiwiY2h1ZHdhIiwiY2h1ZHdhYSIsImNodWR3YWFuZSIsImNodWR3YW5lIiwiY2h1dCIsImNodXRhZCIsImNodXRlIiwiY2h1dGlhIiwiY2h1dGl5YSIsImNodXRpeWUiLCJjaHV0dGFkIiwiY2xpdG9yaXMiLCJjb2NrIiwiY29ja3N1Y2tlciIsImNvb24iLCJjcmFwIiwiY3VsZXJvIiwiY3VtIiwiY3VudCIsImRhbGFhbCIsImRhbGFsIiwiZGFsbGUiLCJkYWxsZXkiLCJkYW1taXQiLCJkYW1uIiwiZGljayIsImRpY2toZWFkIiwiZGlsZG8iLCJkaXBzaGl0IiwiZGlwc3RpY2siLCJkaXB3YWQiLCJkdW1iYXNzIiwiZHVtYmZ1Y2siLCJkdW1iZnVja2VyIiwiZHVtYnNoaXQiLCJkeWtlIiwiZiB1IGMgayIsImZhZyIsImZhZ2dvdCIsImZhdHR1IiwiZmVjayIsImZlbGNoaW5nIiwiZmVsbGF0ZSIsImZlbGxhdGlvIiwiZmxhbmdlIiwiZnVjayIsImZ1Y2tlciIsImZ1Y2tpbmciLCJmdWNrdGFyZCIsImZ1ZGdlIHBhY2tlciIsImZ1ZGdlcGFja2VyIiwiZnVrZXIiLCJmdXEiLCJnYWFuZCIsImdhZGhhIiwiZ2FkaGFsdW5kIiwiZ2FkaGUiLCJnYW5kIiwiZ2FuZGZhdCIsImdhbmRmdXQiLCJnYW5kaXlhIiwiZ2FuZGl5ZSIsImdhbmR1IiwiZ29kIGRhbW4iLCJnb2RkYW0iLCJnb2RkYW1taXQiLCJnb2RkYW1uIiwiZ29vIiwiZ290ZSIsImdvdGV5IiwiZ290dGUiLCJndSIsImhhZyIsImhhZ2d1IiwiaGFnbmUiLCJoYWduZXkiLCJoYW5kam9iIiwiaGFyYWFtamFhZGEiLCJoYXJhbWkiLCJoYXJhbWphZGEiLCJoZWFkYXNzIiwiaGVsbCIsImhlbGxpc2giLCJob2UiLCJob21vIiwiamFja2FzcyIsImplcmsiLCJqZXJrLW9mZiIsImplcmtvZmYiLCJqaXp6Iiwia25vYiBlbmQiLCJrbm9iZW5kIiwia3V0dGEiLCJrdXR0aSIsImxhYmlhIiwibGF1bmRlIiwibG1hbyIsImxtZmFvIiwibG9kdSIsImx1bmQiLCJtYWRhcmNob2QiLCJtYXJpY29uIiwibWYiLCJtaWVyZGEiLCJtaWxmIiwibW9mbyIsIm1vbGVzdCIsIm1vbGVzdGVyIiwibW90aGVyZnVja2VyIiwibW90aGVyZnVrZXIiLCJtdWZmIiwibmlnZ2EiLCJuaWdnZXIiLCJudXRqb2IiLCJvbWciLCJwZWRvcGhpbGUiLCJwZW5kZWphIiwicGVuZGVqbyIsInBlbmlzIiwicGlzcyIsInBpc3NpbmciLCJwb29wIiwicG9ybiIsInByaWNrIiwicHViZSIsInB1c3N5IiwicHV0YSIsInB1dG8iLCJxdWVlciIsInJhbmRpIiwicmFwZSIsInJhcGlzdCIsInMgaGl0Iiwic2NyZXd1cCIsInNjcm90dW0iLCJzY3VtIiwic2N1bWJhZyIsInNleCIsInNoMXQiLCJzaGlpdCIsInNoaXQiLCJzaGl0ZSIsInNoaXR0eSIsInNrYW5rIiwic2thbmt5Iiwic2xlYXplYmFnIiwic2x1dCIsInNtZWdtYSIsInNuYXRjaCIsInNvYiIsInNvbiBvZiBhIGJpdGNoIiwic3BpYyIsInNwdW5rIiwic3VhciIsInN1Z2FyYmFieSIsInN1Z2FyZGFkZHkiLCJ0aXQiLCJ0b3NzZXIiLCJ0dXJkIiwidHdhdCIsInZhZ2luYSIsIndhbmsiLCJ3YW5rZXIiLCJ3aG9yZSIsInd0ZiIsInd0aCIsImZjayIsImZrIiwic3giLCJzY2siLCJjbSIsInJwIiwiZGsiLCJkaWsiLCJzcXVpcnQiLCJzcWlydCIsInNxdXJ0IiwiaG90Il0="
    )
  );

 
  function generateObfuscatedForms(word) {
    const lower = word.toLowerCase();
    let results = [lower];
    return results;
  }

  let expandedSet = new Set();
  for (const profaneWord of baseProfanityList) {
    generateObfuscatedForms(profaneWord).forEach((v) => expandedSet.add(v));
  }
  const secondPass = new Set();
  for (const variation of expandedSet) {
    generateObfuscatedForms(variation).forEach((sv) => secondPass.add(sv));
  }
  for (const entry of secondPass) {
    expandedSet.add(entry);
  }

  return Array.from(expandedSet).sort();
})();

function normalizeText(text) {
  let normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const map = {
    0: "o",
    1: "i",
    2: "z",
    3: "e",
    4: "a",
    5: "s",
    6: "g",
    7: "t",
    8: "b",
    9: "g",
    "@": "a",
    $: "s",
    "!": "i",
  };
  return normalized.replace(/[0123456789!@\$]/g, (c) => map[c] || c).replace(/(.)\1+/g, "$1");
}

function containsProfanity(text) {
  const normalized = normalizeText(text);
  return profanityList.some((word) => normalized.includes(word));
}

module.exports = containsProfanity;
