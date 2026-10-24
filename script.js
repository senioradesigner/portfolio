document.addEventListener("DOMContentLoaded", () => {
  // Кнопка "Наверх"
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Переключение кейсов
  const tabLinks = document.querySelectorAll(".project-tabs a");
  const caseItems = document.querySelectorAll(".case-item");
  const caseWrapper = document.querySelector(".case-content-wrapper");
  const projectCards = document.querySelectorAll(".project-card");

  function showCase(targetId) {
    tabLinks.forEach((t) => t.classList.toggle("active", t.dataset.target === targetId));
    caseItems.forEach((c) => c.classList.toggle("active", c.id === "case-" + targetId));
  }

  function scrollToCases() {
    if (!caseWrapper) return;
    const y = caseWrapper.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Клик по табам
  tabLinks.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      showCase(tab.dataset.target);
    });
  });

  // Клик по карточкам проектов — переключает кейс и скроллит
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const target = card.dataset.target;
      if (target) {
        showCase(target);
        scrollToCases();
      }
    });
  });

  // Активируем первый кейс при загрузке
  if (tabLinks.length && caseItems.length) {
    showCase(tabLinks[0].dataset.target);
  }

   // ===== КАРУСЕЛЬ LIME =====
  const limeTrack = document.getElementById('carouselTrack');
  const limeSlides = limeTrack ? limeTrack.querySelectorAll('.carousel-slide') : [];
  const limePrev = document.getElementById('carouselPrev');
  const limeNext = document.getElementById('carouselNext');
  const limeTabs = document.querySelectorAll('.brand-tab');

  if (limeTrack && limeSlides.length > 0) {
    let limeIndex = 0;
    const limeTotal = limeSlides.length;
    let limeInterval;
    let limeIsVisible = false;

    function goToLimeSlide(index) {
      if (index < 0) index = limeTotal - 1;
      if (index >= limeTotal) index = 0;
      limeIndex = index;
      limeTrack.style.transform = `translateX(-${limeIndex * 100}%)`;

      // Синхронизируем логотипы
      limeTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === limeIndex);
      });
    }

    function startLimeAutoPlay() {
      stopLimeAutoPlay();
      limeInterval = setInterval(() => {
        goToLimeSlide(limeIndex + 1);
      }, 3000); // 3 секунды
    }

    function stopLimeAutoPlay() {
      if (limeInterval) {
        clearInterval(limeInterval);
      }
    }

    // Кнопки
    if (limePrev) {
      limePrev.addEventListener('click', () => {
        goToLimeSlide(limeIndex - 1);
        if (limeIsVisible) startLimeAutoPlay();
      });
    }

    if (limeNext) {
      limeNext.addEventListener('click', () => {
        goToLimeSlide(limeIndex + 1);
        if (limeIsVisible) startLimeAutoPlay();
      });
    }

    // Логотипы
    limeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const index = parseInt(tab.dataset.index);
        goToLimeSlide(index);
        if (limeIsVisible) startLimeAutoPlay();
      });
    });

    // Обсервер
    const limeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!limeIsVisible) {
            limeIsVisible = true;
            startLimeAutoPlay();
          }
        } else {
          limeIsVisible = false;
          stopLimeAutoPlay();
        }
      });
    }, { threshold: 0.5 });

    if (limeTrack.closest('.carousel-wrapper')) {
      limeObserver.observe(limeTrack.closest('.carousel-wrapper'));
    }
  }

    // Копирование никнейма
  const copyBtn = document.getElementById("copyNickname");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const textToCopy = "@senioradesigner";
      
      // Используем современный API, если доступен
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopyFeedback(copyBtn);
        }).catch(err => {
          console.error("Ошибка копирования: ", err);
          fallbackCopy(textToCopy, copyBtn);
        });
      } else {
        // Фоллбэк для старых браузеров
        fallbackCopy(textToCopy, copyBtn);
      }
    });
  }

  function fallbackCopy(text, element) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showCopyFeedback(element);
    } catch (err) {
      console.error("Не удалось скопировать", err);
    }
    document.body.removeChild(textArea);
  }

  function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = "Copied!";
    setTimeout(() => {
      element.textContent = originalText;
    }, 2000); // Возвращаем текст через 2 секунды
  }

    // ===== КАРУСЕЛЬ SMARTLABS =====
  const smTrack = document.getElementById('smartlabsTrack');
  const smSlides = smTrack ? smTrack.querySelectorAll('.carousel-slide') : [];
  const smPrev = document.getElementById('smCarouselPrev');
  const smNext = document.getElementById('smCarouselNext');

  if (smTrack && smSlides.length > 0) {
    let smIndex = 0;
    const smTotal = smSlides.length;
    let smInterval;
    let smIsVisible = false;

    function goToSmSlide(index) {
      if (index < 0) index = smTotal - 1;
      if (index >= smTotal) index = 0;
      smIndex = index;
      smTrack.style.transform = `translateX(-${smIndex * 100}%)`;
    }

    function startSmAutoPlay() {
      stopSmAutoPlay();
      smInterval = setInterval(() => {
        goToSmSlide(smIndex + 1);
      }, 3000); // 3 секунды
    }

    function stopSmAutoPlay() {
      if (smInterval) {
        clearInterval(smInterval);
      }
    }

    // Кнопки
    smPrev.addEventListener('click', () => {
      goToSmSlide(smIndex - 1);
      if (smIsVisible) startSmAutoPlay(); // сброс таймера при клике
    });

    smNext.addEventListener('click', () => {
      goToSmSlide(smIndex + 1);
      if (smIsVisible) startSmAutoPlay();
    });

    // Запуск только когда карусель видна
    const smObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!smIsVisible) {
            smIsVisible = true;
            startSmAutoPlay();
          }
        } else {
          smIsVisible = false;
          stopSmAutoPlay();
        }
      });
    }, { threshold: 0.5 });

    smObserver.observe(smTrack.closest('.carousel-wrapper'));
  }

    // ===== КАРУСЕЛЬ VARITEKS =====
  const varTrack = document.getElementById('variteksTrack');
  const varSlides = varTrack ? varTrack.querySelectorAll('.carousel-slide') : [];
  const varPrev = document.getElementById('varCarouselPrev');
  const varNext = document.getElementById('varCarouselNext');

  if (varTrack && varSlides.length > 0) {
    let varIndex = 0;
    const varTotal = varSlides.length;
    let varInterval;
    let varIsVisible = false;

    function goToVarSlide(index) {
      if (index < 0) index = varTotal - 1;
      if (index >= varTotal) index = 0;
      varIndex = index;
      varTrack.style.transform = `translateX(-${varIndex * 100}%)`;
    }

    function startVarAutoPlay() {
      stopVarAutoPlay();
      varInterval = setInterval(() => {
        goToVarSlide(varIndex + 1);
      }, 3000); // 3 секунды
    }

    function stopVarAutoPlay() {
      if (varInterval) {
        clearInterval(varInterval);
      }
    }

    // Кнопки
    varPrev.addEventListener('click', () => {
      goToVarSlide(varIndex - 1);
      if (varIsVisible) startVarAutoPlay();
    });

    varNext.addEventListener('click', () => {
      goToVarSlide(varIndex + 1);
      if (varIsVisible) startVarAutoPlay();
    });

    // Запуск только когда карусель видна
    const varObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!varIsVisible) {
            varIsVisible = true;
            startVarAutoPlay();
          }
        } else {
          varIsVisible = false;
          stopVarAutoPlay();
        }
      });
    }, { threshold: 0.5 });

    varObserver.observe(varTrack.closest('.carousel-wrapper'));
  }

    // ===== КАРУСЕЛЬ ORGANAZA =====
  const orgTrack = document.getElementById('organazaTrack');
  const orgSlides = orgTrack ? orgTrack.querySelectorAll('.carousel-slide') : [];
  const orgPrev = document.getElementById('orgCarouselPrev');
  const orgNext = document.getElementById('orgCarouselNext');

  if (orgTrack && orgSlides.length > 0) {
    let orgIndex = 0;
    const orgTotal = orgSlides.length;
    let orgInterval;
    let orgIsVisible = false;

    function goToOrgSlide(index) {
      if (index < 0) index = orgTotal - 1;
      if (index >= orgTotal) index = 0;
      orgIndex = index;
      orgTrack.style.transform = `translateX(-${orgIndex * 100}%)`;
    }

    function startOrgAutoPlay() {
      stopOrgAutoPlay();
      orgInterval = setInterval(() => {
        goToOrgSlide(orgIndex + 1);
      }, 3000); // 3 секунды
    }

    function stopOrgAutoPlay() {
      if (orgInterval) {
        clearInterval(orgInterval);
      }
    }

    orgPrev.addEventListener('click', () => {
      goToOrgSlide(orgIndex - 1);
      if (orgIsVisible) startOrgAutoPlay();
    });

    orgNext.addEventListener('click', () => {
      goToOrgSlide(orgIndex + 1);
      if (orgIsVisible) startOrgAutoPlay();
    });

    const orgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!orgIsVisible) {
            orgIsVisible = true;
            startOrgAutoPlay();
          }
        } else {
          orgIsVisible = false;
          stopOrgAutoPlay();
        }
      });
    }, { threshold: 0.5 });

    orgObserver.observe(orgTrack.closest('.carousel-wrapper'));
  }

  // ===== ПОПАП СВЯЗИ =====
  const contactBtn = document.querySelector('.contact-button'); // Кнопка в шапке
  const popup = document.getElementById('contactPopup');
  const closePopup = document.getElementById('closePopup');
  const copyEmailBtn = document.getElementById('copyEmail');

  if (contactBtn && popup) {
    // Открытие
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.add('active');
    });

    // Закрытие по крестику
    if (closePopup) {
      closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }

    // Закрытие по клику на фон
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });

    // Копирование почты
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = "senioradesigner@gmail.com";
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showEmailCopied(copyEmailBtn);
          });
        } else {
          // Фоллбэк
          const textArea = document.createElement("textarea");
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          showEmailCopied(copyEmailBtn);
        }
      });
    }

    // Функция визуального фидбека при копировании
    function showEmailCopied(button) {
      const valueSpan = button.querySelector('.contact-option-value');
      const originalText = valueSpan.textContent;
      
      valueSpan.textContent = "Copied!";
      valueSpan.style.color = "#00A859"; // Зеленый цвет успеха
      
      setTimeout(() => {
        valueSpan.textContent = originalText;
        valueSpan.style.color = "";
      }, 2000);
    }
  }

});