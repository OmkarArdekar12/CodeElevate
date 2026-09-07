var reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const typeLine = document.getElementById("typeline");

const messages = [
  "Join CodeElevate Community",
  "Connect. Code. Collaborate.",
  "Elevate Your Coding Journey.",
];

let messageIndex = 0;
let charIndex = 0;
let deleting = false;
let typeTimer;

function typeLoop() {
  if (!typeLine) return;

  const current = messages[messageIndex];

  if (!deleting) {
    typeLine.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex >= current.length) {
      deleting = true;
      typeTimer = setTimeout(typeLoop, 2200);
      return;
    }

    const typingSpeed = 45 + Math.random() * 55;
    typeTimer = setTimeout(typeLoop, typingSpeed);
    return;
  }

  typeLine.textContent = current.slice(0, charIndex);
  charIndex--;

  if (charIndex <= 0) {
    charIndex = 0;
    deleting = false;
    messageIndex = (messageIndex + 1) % messages.length;

    typeTimer = setTimeout(typeLoop, 650);
    return;
  }

  const deletingSpeed = 22 + Math.random() * 28;
  typeTimer = setTimeout(typeLoop, deletingSpeed);
}

if (!reduceMotion) {
  setTimeout(typeLoop, 700);
} else {
  typeLine.textContent = messages[0];
}

var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  var ro = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          ro.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach(function (el) {
    ro.observe(el);
  });
} else {
  reveals.forEach(function (el) {
    el.classList.add("in-view");
  });
}

function animateCount(el) {
  var target = parseInt(el.getAttribute("data-count"), 10) || 0;
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  var startTime = null,
    duration = 900;
  function frame(ts) {
    if (!startTime) startTime = ts;
    var p = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  }
  requestAnimationFrame(frame);
}
var counters = document.querySelectorAll("[data-count]");
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  counters.forEach(function (c) {
    io.observe(c);
  });
} else {
  counters.forEach(animateCount);
}

document.querySelectorAll(".tabbar").forEach(function (bar) {
  var tabs = bar.querySelectorAll(".tab");
  var wrap = bar.parentElement;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");
      var name = tab.getAttribute("data-tab");
      wrap.querySelectorAll(":scope > .tabpanel").forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-panel") === name);
      });
    });
  });
});

var railDots = document.querySelectorAll(".rail-dot");
var railSections = Array.from(railDots)
  .map(function (d) {
    return document.getElementById(d.getAttribute("data-rail"));
  })
  .filter(Boolean);
if ("IntersectionObserver" in window && railSections.length) {
  var railObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var dot = document.querySelector(
          '.rail-dot[data-rail="' + entry.target.id + '"]',
        );
        if (!dot) return;
        if (entry.isIntersecting) {
          railDots.forEach(function (d) {
            d.classList.remove("active");
          });
          dot.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );
  railSections.forEach(function (s) {
    railObs.observe(s);
  });
}

if (!reduceMotion) {
  document.querySelectorAll(".tilt").forEach(function (card) {
    var wrap = card.parentElement;
    wrap.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        "perspective(1000px) rotateY(" +
        x * 7 +
        "deg) rotateX(" +
        -y * 7 +
        "deg) scale3d(1.015,1.015,1.015)";
    });
    wrap.addEventListener("mouseleave", function () {
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    });
  });
}

var shell = document.getElementById("videoShell");
if (shell) {
  shell.addEventListener("click", function () {
    shell.innerHTML =
      '<iframe class="w-full h-full" src="https://www.youtube.com/embed/4-Udx0xvsO0?autoplay=1&rel=0" title="CodeElevate demo video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
}
