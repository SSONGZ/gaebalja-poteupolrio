(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const menuLabel = menuButton.querySelector(".sr-only");

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuLabel.textContent = "메뉴 열기";
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuLabel.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
    navigation.classList.toggle("is-open", isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  const dialog = document.querySelector(".guide-dialog");
  const openGuide = document.querySelector("[data-open-guide]");
  const closeDialog = () => dialog.close();
  openGuide.addEventListener("click", () => dialog.showModal());
  document.querySelector(".dialog-close").addEventListener("click", closeDialog);
  document.querySelector(".dialog-done").addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  const toast = document.querySelector("#toast");
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
  };

  const emailButton = document.querySelector("[data-copy-email]");
  emailButton.addEventListener("click", async () => {
    const email = "songsj20050727@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("이메일 주소를 복사했습니다.");
    } catch {
      const helper = document.createElement("textarea");
      helper.value = email;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.append(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      showToast(copied ? "이메일 주소를 복사했습니다." : "복사할 수 없습니다. 이메일 링크를 이용해 주세요.");
    }
  });

  const form = document.querySelector("#project-form");
  const status = document.querySelector("#draft-status");
  const storageKey = "song-seongjin-project-draft-v1";
  const fields = Array.from(form.querySelectorAll("input, textarea"));

  const restoreDraft = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!saved || typeof saved !== "object") return;
      fields.forEach((field) => {
        if (typeof saved[field.name] === "string") field.value = saved[field.name];
      });
      status.textContent = "저장된 임시 기록을 불러왔습니다.";
    } catch {
      status.textContent = "저장된 기록을 불러오지 못했습니다.";
    }
  };
  restoreDraft();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const draft = Object.fromEntries(fields.map((field) => [field.name, field.value.trim()]));
    if (!Object.values(draft).some(Boolean)) {
      status.textContent = "먼저 기록할 내용을 입력해 주세요.";
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
      status.textContent = "이 기기에 임시 저장했습니다. 아직 공개된 프로젝트는 아닙니다.";
    } catch {
      status.textContent = "저장 공간을 사용할 수 없습니다. 입력 내용은 이 화면에 남아 있습니다.";
    }
  });

  form.addEventListener("reset", (event) => {
    if (!window.confirm("입력한 내용과 이 기기에 저장된 임시 기록을 모두 지울까요?")) {
      event.preventDefault();
      return;
    }
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // The visible form can still be cleared when local storage is unavailable.
    }
    window.setTimeout(() => {
      status.textContent = "임시 기록을 지웠습니다.";
    }, 0);
  });

  const revealItems = document.querySelectorAll(".section-heading, .about-content, .stack-layout, .project-empty, .project-draft, .experience-item, .recognition, .contact-inner");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }
})();
