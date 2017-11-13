export default class ConvertTense {
  constructor(verb) {
    this.verb = verb;
    this.exceptions = {
      are: "were",
      bear: "bore",
      beat: "beat",
      beget: "begot",
      begin: "began",
      bend: "bent",
      bet: "bet",
      bid: "bid",
      bide: "bided",
      bind: "bound",
      bite: "bit",
      bleed: "bled",
      blow: "blew",
      break: "broke",
      breed: "bred",
      bring: "brought",
      built: "built",
      burn: "burned",
      burst: "burst",
      buy: "bought",
      cast: "cast",
      catch: "caught",
      choose: "chose",
      cling: "clung",
      come: "came",
      cost: "cost",
      creep: "crept",
      cut: "cut",
      deal: "dealt",
      dig: "dug",
      dive: "dove",
      do: "did",
      draw: "drew",
      drink: "drank",
      drive: "drove",
      dwell: "dwelt",
      eat: "ate",
      fall: "fell",
      feed: "fed",
      feel: "felt",
      fight: "fought",
      find: "found",
      fit: "fit",
      flee: "fled",
      fling: "flung",
      fly: "flew",
      forbid: "forbid",
      forget: "forgot",
      forsake: "forsook",
      freeze: "froze",
      get: "got",
      gild: "gilded",
      give: "gave",
      go: "went",
      grind: "ground",
      grow: "grew",
      hang: "hung",
      have: "had",
      hear: "heard",
      hew: "hewed",
      hide: "hid",
      hit: "hit",
      hoist: "hoisted",
      hold: "held",
      hurt: "hurt",
      keep: "kept",
      kneel: "knelt",
      knit: "knitted",
      know: "knew",
      lay: "laid",
      lead: "lead",
      lean: "leaned",
      leap: "leapt",
      learn: "learned",
      leave: "left",
      lend: "lent",
      let: "let",
      lie: "lay",
      light: "lit",
      lose: "lost",
      make: "made",
      mean: "meant",
      meet: "met",
      mow: "mowed",
      pay: "pay",
      plead: "pleaded",
      prove: "proved",
      put: "put",
      quit: "quit",
      read: "read",
      ride: "rode",
      ring: "rang",
      rise: "rose",
      run: "ran",
      say: "said",
      see: "saw",
      seek: "sought",
      sell: "sold",
      send: "sent",
      set: "set",
      sew: "sewed",
      shake: "shook",
      shall: "should",
      shear: "sheared",
      shed: "shed",
      shine: "shone",
      shit: "shat",
      shoe: "shoed",
      show: "showed",
      shrink: "shrank",
      shrive: "shrove",
      shut: "shut",
      sing: "sang",
      sink: "sank",
      sit: "sat",
      slay: "slew",
      sleep: "slept",
      slide: "slid",
      sling: "slung",
      slink: "slunk",
      slit: "slit",
      smell: "smelled",
      smite: "smote",
      sneak: "sneaked",
      sow: "sowed",
      speak: "spoke",
      speed: "sped",
      spell: "spelled",
      spend: "spent",
      spill: "spilled",
      spin: "spun",
      spit: "spat",
      split: "split",
      spoil: "spoiled",
      spread: "spread",
      spring: "sprang",
      stand: "stood",
      stave: "stove",
      steal: "stole",
      stick: "stuck",
      sting: "stung",
      stive: "strove",
      swear: "swore",
      sweat: "sweat",
      sweep: "swept",
      swell: "swelled",
      swim: "swam",
      swing: "swung",
      take: "took",
      teach: "tought",
      tear: "tore",
      tell: "told",
      think: "thought",
      throw: "threw",
      thrust: "thrusted",
      tread: "trod",
      wake: "woke",
      wear: "wore",
      weave: "wove",
      wed: "wed",
      weep: "wept",
      wet: "wet",
      win: "won",
      wind: "wound",
      wring: "wrang",
      write: "wrote"
    };
  }

  get past() {
    return this.convertToPast();
  }

  convertToPast() {
    if (this.exceptions[this.verb]) {
      return this.exceptions[this.verb];
    }
    if (/e$/i.test(this.verb)) {
      console.log("1");
      return this.verb + "d";
    }
    if (/[aeiou]c/i.test(this.verb)) {
      console.log("2");
      return this.verb + "ed";
    }
    if (/el$/i.test(this.verb)) {
      console.log("3");
      return this.verb + "ed";
    }
    if (/[aeio][aeriou][dlmnprst]$/.test(this.verb)) {
      console.log("4");
      return this.verb + "ed";
    }
    if (/[aeiou][a-z]*[aeiou][bdglmnprst]$/i.test(this.verb)) {
      return this.verb + "ed";
    }
    if (/[aeiou][bdglmnprst]$/i.test(this.verb)) {
      console.log("5");
      return this.verb.replace(/(\w+[aeiou])([bdglmnprst])/, "$1$2$2ed");
    }
    if (/[a-z]*[^ao]y$/i.test(this.verb)) {
      console.log("6");
      return this.verb.replace(/(.*)y/, "$1ied");
    }
    return this.verb + "ed";
  }
}
