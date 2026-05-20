// ============================================
// Portfolio - Dynamic Data Loader (Firebase)
// ============================================

// Store loaded project data for modals
let projectData = {};

// ---------- Escape HTML to prevent XSS ----------
function escapeHtml(str) {
	if (!str) return '';
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}

function nlToBr(str) {
	return escapeHtml(str).replace(/\n/g, '<br>');
}

// ---------- Fade-in on scroll ----------
document.addEventListener('DOMContentLoaded', function() {
	const fadeEls = document.querySelectorAll('.fade-in-up');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
			} else {
				entry.target.classList.remove('in-view');
			}
		});
	}, { threshold: 0.15 });
	fadeEls.forEach(el => observer.observe(el));

	// Load dynamic data from Firebase
	loadPortfolioData();

	// Mobile menu toggle
	const menuBtn = document.getElementById('mobile-menu-btn');
	const headerNav = document.getElementById('header-nav');
	if (menuBtn && headerNav) {
		menuBtn.addEventListener('click', function() {
			menuBtn.classList.toggle('active');
			headerNav.classList.toggle('open');
		});
		// Close menu when a nav link is clicked
		headerNav.querySelectorAll('.nav-links a').forEach(link => {
			link.addEventListener('click', function() {
				menuBtn.classList.remove('active');
				headerNav.classList.remove('open');
			});
		});
	}

	// Smooth scroll for all anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').substring(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Active nav link on scroll
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-links a');
	window.addEventListener('scroll', function() {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100;
			if (window.scrollY >= sectionTop) {
				current = section.getAttribute('id');
			}
		});
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === '#' + current) {
				link.classList.add('active');
			}
		});
	});
});

// ---------- Load All Portfolio Data ----------
async function loadPortfolioData() {
	try {
		await Promise.all([
			loadHeroData(),
			loadProjectsData(),
			loadSkillsData(),
			loadContactData(),
			loadSettingsData(),
			loadAboutData(),
			loadServicesData(),
			loadTestimonialsData()
		]);
	} catch (err) {
		console.error('Error loading portfolio data:', err);
	}
}

// ---------- Hero Section ----------
async function loadHeroData() {
	try {
		const doc = await db.collection('portfolio').doc('hero').get();
		if (!doc.exists) return;
		const data = doc.data();

		const greetingEl = document.getElementById('hero-greeting');
		const nameEl = document.getElementById('hero-name');
		const descEl = document.getElementById('hero-desc');
		const photoEl = document.getElementById('hero-photo');
		const logoImg = document.getElementById('logo-img');
		const logoText = document.getElementById('logo-text');
		const ctaBtn = document.getElementById('header-cta-btn');

		if (greetingEl && data.greeting) greetingEl.textContent = data.greeting;
		if (nameEl && data.name) nameEl.textContent = data.name;
		if (descEl && data.description) descEl.textContent = data.description;
		if (photoEl && data.photo) photoEl.src = data.photo;
		if (logoImg && data.logo) logoImg.src = data.logo;
		else if (logoImg && data.photo) logoImg.src = data.photo;
		if (logoText && data.name) logoText.textContent = data.name;
		if (ctaBtn && data.ctaLink) ctaBtn.href = data.ctaLink;
		if (ctaBtn && data.ctaText) ctaBtn.textContent = data.ctaText;

		// Start typewriter with roles from Firebase
		if (data.roles && data.roles.length > 0) {
			startTypewriter(data.roles);
		}
	} catch (err) {
		console.error('Error loading hero:', err);
		// Fallback: start typewriter with default roles
		startTypewriter(['Web Developer', 'Software Developer', '2D Game Developer', 'Full Stack Developer', 'Tech Problem Solver']);
	}
}

// ---------- Typewriter Animation ----------
function startTypewriter(roles) {
	const el = document.getElementById('hero-role');
	if (!el || !roles.length) return;
	let roleIdx = 0, charIdx = 0, isDeleting = false;

	function type() {
		const current = roles[roleIdx];
		if (isDeleting) {
			charIdx--;
			el.textContent = current.substring(0, charIdx);
			if (charIdx === 0) {
				isDeleting = false;
				roleIdx = (roleIdx + 1) % roles.length;
				setTimeout(type, 700);
			} else {
				setTimeout(type, 40);
			}
		} else {
			charIdx++;
			el.textContent = current.substring(0, charIdx);
			if (charIdx === current.length) {
				isDeleting = true;
				setTimeout(type, 1200);
			} else {
				setTimeout(type, 80);
			}
		}
	}
	type();
}

// ---------- Projects Section ----------
async function loadProjectsData() {
	try {
		const snap = await db.collection('portfolio').doc('projects').collection('items').orderBy('order').get();
		const container = document.getElementById('projects-list');
		if (!container || snap.empty) return;

		container.innerHTML = '';
		projectData = {};
		let count = 0;

		snap.forEach(doc => {
			const d = doc.data();
			const id = doc.id;
			projectData[id] = d;
			count++;

			// Only show first 2 on main page
			if (count <= 2) {
				const thumb = d.images && d.images[0] ? d.images[0] : '';
				const card = document.createElement('div');
				card.className = 'project-card';
				const liveBtn = d.liveUrl && d.status === 'live'
					? `<a href="${escapeHtml(d.liveUrl)}" target="_blank" class="live-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live Demo</a>`
					: '';
				const statusBadge = d.status === 'live'
					? '<span class="status-badge live">● Live</span>'
					: '<span class="status-badge not-live">○ Not Live</span>';
				const descText = (d.desc || '').length > 120 ? d.desc.substring(0, 120) + '...' : (d.desc || '');
				card.innerHTML = `
					<div class="project-card-image">
						${thumb ? `<img src="${escapeHtml(thumb)}" alt="${escapeHtml(d.title)}" class="project-thumb">` : '<div class="project-thumb-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>'}
						<div class="project-card-overlay">
							<button class="overlay-btn" onclick="openProjectModal('${id}')">View Details</button>
						</div>
						${d.status === 'live' ? '<span class="project-live-indicator">● Live</span>' : ''}
					</div>
					<div class="project-card-body">
						<h3>${escapeHtml(d.title)}</h3>
						<p>${escapeHtml(descText)}</p>
						<div class="project-card-actions">
							${liveBtn}
							<button class="details-btn" onclick="openProjectModal('${id}')">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
								More Details
							</button>
						</div>
					</div>
				`;
				container.appendChild(card);
			}
		});
	} catch (err) {
		console.error('Error loading projects:', err);
	}
}

function showAllProjects() {
	const modal = document.getElementById('project-modal');
	const body = document.getElementById('modal-body');
	let html = '<h3 style="margin-bottom:24px;">All Projects</h3>';
	html += '<div class="see-all-grid">';
	Object.entries(projectData).forEach(([id, data]) => {
		const thumb = data.images && data.images[0] ? data.images[0] : '';
		const liveBtn2 = data.liveUrl && data.status === 'live'
			? `<a href="${escapeHtml(data.liveUrl)}" target="_blank" class="live-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live</a>`
			: '';
		const descText = (data.desc || '').length > 80 ? data.desc.substring(0, 80) + '...' : (data.desc || '');
		html += `
			<div class="see-all-card">
				<div class="see-all-card-image">
					${thumb ? `<img src="${escapeHtml(thumb)}" class="see-all-thumb" alt="${escapeHtml(data.title)}">` : ''}
					${data.status === 'live' ? '<span class="project-live-indicator">● Live</span>' : ''}
				</div>
				<div class="see-all-card-body">
					<h4>${escapeHtml(data.title)}</h4>
					<p>${escapeHtml(descText)}</p>
					<div class="project-card-actions">
						${liveBtn2}
						<button class="details-btn" onclick="openProjectModal('${id}')">Details</button>
					</div>
				</div>
			</div>
		`;
	});
	html += '</div>';
	body.innerHTML = html;
	modal.style.display = 'block';
}

function openProjectModal(id) {
	const modal = document.getElementById('project-modal');
	const body = document.getElementById('modal-body');
	const data = projectData[id];
	if (!data) return;

	let gallery = '';
	if (data.images) {
		data.images.forEach((img, idx) => {
			gallery += `<img src="${escapeHtml(img)}" class="${idx === 0 ? 'active' : ''}" onclick="showModalImage(this)">`;
		});
	}

	const mainImg = data.images && data.images[0] ? data.images[0] : '';
	const modalLiveBtn = data.liveUrl && data.status === 'live'
		? `<a href="${escapeHtml(data.liveUrl)}" target="_blank" class="live-btn modal-live-btn">View Live Demo</a>`
		: '';
	const modalStatus = data.status === 'live'
		? '<span class="status-badge live">● Live</span>'
		: '<span class="status-badge not-live">○ Not Live</span>';
	body.innerHTML = `
		${mainImg ? `<img src="${escapeHtml(mainImg)}" class="modal-main-img" id="modal-main-img">` : ''}
		<div class="modal-gallery">${gallery}</div>
		<div class="modal-header-row">
			<h3>${escapeHtml(data.title)}</h3>
			${modalStatus}
		</div>
		<div class="project-detail-text">${nlToBr(data.details)}</div>
		${modalLiveBtn}
	`;
	modal.style.display = 'block';
}

function closeProjectModal() {
	document.getElementById('project-modal').style.display = 'none';
}

function showModalImage(imgElem) {
	const mainImg = document.getElementById('modal-main-img');
	if (mainImg) {
		mainImg.src = imgElem.src;
		document.querySelectorAll('.modal-gallery img').forEach(img => img.classList.remove('active'));
		imgElem.classList.add('active');
	}
}

// Close modal on outside click
window.onclick = function(event) {
	const modal = document.getElementById('project-modal');
	if (event.target === modal) {
		closeProjectModal();
	}
};

// ---------- Skills Section ----------
const SKILL_ICON_MAP_FRONT = {
	'html':'html5/html5-original','html5':'html5/html5-original',
	'css':'css3/css3-original','css3':'css3/css3-original',
	'javascript':'javascript/javascript-original','js':'javascript/javascript-original',
	'typescript':'typescript/typescript-original','ts':'typescript/typescript-original',
	'python':'python/python-original','java':'java/java-original',
	'c':'c/c-original','c++':'cplusplus/cplusplus-original','cpp':'cplusplus/cplusplus-original',
	'c#':'csharp/csharp-original','csharp':'csharp/csharp-original',
	'php':'php/php-original','ruby':'ruby/ruby-original',
	'swift':'swift/swift-original','kotlin':'kotlin/kotlin-original',
	'go':'go/go-original','golang':'go/go-original',
	'rust':'rust/rust-original','dart':'dart/dart-original',
	'r':'r/r-original','scala':'scala/scala-original',
	'react':'react/react-original','reactjs':'react/react-original','react native':'react/react-original',
	'angular':'angularjs/angularjs-original','angularjs':'angularjs/angularjs-original',
	'vue':'vuejs/vuejs-original','vuejs':'vuejs/vuejs-original','vue.js':'vuejs/vuejs-original',
	'svelte':'svelte/svelte-original',
	'next':'nextjs/nextjs-original','nextjs':'nextjs/nextjs-original','next.js':'nextjs/nextjs-original',
	'node':'nodejs/nodejs-original','nodejs':'nodejs/nodejs-original','node.js':'nodejs/nodejs-original',
	'express':'express/express-original','expressjs':'express/express-original',
	'django':'django/django-plain','flask':'flask/flask-original',
	'spring':'spring/spring-original','laravel':'laravel/laravel-original',
	'firebase':'firebase/firebase-plain',
	'mongodb':'mongodb/mongodb-original','mysql':'mysql/mysql-original',
	'postgresql':'postgresql/postgresql-original','postgres':'postgresql/postgresql-original',
	'redis':'redis/redis-original','sqlite':'sqlite/sqlite-original',
	'graphql':'graphql/graphql-plain',
	'docker':'docker/docker-original','kubernetes':'kubernetes/kubernetes-plain',
	'aws':'amazonwebservices/amazonwebservices-plain-wordmark',
	'azure':'azure/azure-original',
	'gcp':'googlecloud/googlecloud-original','google cloud':'googlecloud/googlecloud-original',
	'git':'git/git-original','github':'github/github-original','gitlab':'gitlab/gitlab-original',
	'linux':'linux/linux-original','bash':'bash/bash-original',
	'figma':'figma/figma-original',
	'sass':'sass/sass-original','scss':'sass/sass-original',
	'tailwind':'tailwindcss/tailwindcss-original','tailwindcss':'tailwindcss/tailwindcss-original','tailwind css':'tailwindcss/tailwindcss-original',
	'bootstrap':'bootstrap/bootstrap-original',
	'jquery':'jquery/jquery-original',
	'webpack':'webpack/webpack-original','vite':'vitejs/vitejs-original',
	'npm':'npm/npm-original-wordmark',
	'flutter':'flutter/flutter-original',
	'unity':'unity/unity-original',
	'tensorflow':'tensorflow/tensorflow-original','pytorch':'pytorch/pytorch-original',
	'pandas':'pandas/pandas-original','numpy':'numpy/numpy-original',
	'electron':'electron/electron-original',
	'redux':'redux/redux-original',
	'arduino':'arduino/arduino-original','android':'android/android-original',
	'wordpress':'wordpress/wordpress-plain',
	'heroku':'heroku/heroku-original','netlify':'netlify/netlify-original','vercel':'vercel/vercel-original'
};
function getAutoIconFront(name) {
	const p = SKILL_ICON_MAP_FRONT[name.trim().toLowerCase()];
	return p ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + p + '.svg' : '';
}

async function loadSkillsData() {
	try {
		const snap = await db.collection('portfolio').doc('skills').collection('items').orderBy('order').get();
		const container = document.getElementById('skills-grid');
		if (!container || snap.empty) return;

		container.innerHTML = '';
		snap.forEach(doc => {
			const d = doc.data();
			const iconUrl = d.icon || getAutoIconFront(d.name);
			const card = document.createElement('div');
			card.className = 'skill-card';
			card.innerHTML = `
				${iconUrl ? `<img src="${escapeHtml(iconUrl)}" alt="${escapeHtml(d.name)}" class="skill-icon">` : ''}
				<span>${escapeHtml(d.name)}</span>
			`;
			container.appendChild(card);
		});
	} catch (err) {
		console.error('Error loading skills:', err);
	}
}

// ---------- Contact Section ----------
async function loadContactData() {
	try {
		const doc = await db.collection('portfolio').doc('contact').get();
		if (!doc.exists) return;
		const d = doc.data();
		const container = document.getElementById('contact-info');
		if (!container) return;

		container.innerHTML = `
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/feathericons/feather/icons/user.svg" alt="Name"></span>
				<span class="contact-label">Name</span>
				<span class="contact-value">${escapeHtml(d.name)}</span>
			</div>
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Email"></span>
				<span class="contact-label">Email</span>
				<span class="contact-value"><a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></span>
			</div>
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/feathericons/feather/icons/phone.svg" alt="Phone"></span>
				<span class="contact-label">Phone</span>
				<span class="contact-value"><a href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a></span>
			</div>
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/feathericons/feather/icons/map-pin.svg" alt="Location"></span>
				<span class="contact-label">Location</span>
				<span class="contact-value">${escapeHtml(d.location)}</span>
			</div>
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook"></span>
				<span class="contact-label">Facebook</span>
				<span class="contact-value"><a href="${escapeHtml(d.facebook)}" target="_blank">${escapeHtml(d.facebookText || 'Facebook')}</a></span>
			</div>
			<div class="contact-row">
				<span class="contact-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"></span>
				<span class="contact-label">GitHub</span>
				<span class="contact-value"><a href="${escapeHtml(d.github)}" target="_blank">${escapeHtml(d.githubText || 'GitHub')}</a></span>
			</div>
		`;
	} catch (err) {
		console.error('Error loading contact:', err);
	}
}

// ---------- Settings ----------
async function loadSettingsData() {
	try {
		const doc = await db.collection('portfolio').doc('settings').get();
		if (!doc.exists) return;
		const d = doc.data();

		if (d.title) document.title = d.title;
		const footerEl = document.getElementById('footer-text');
		if (footerEl && d.footer) footerEl.textContent = d.footer;
	} catch (err) {
		console.error('Error loading settings:', err);
	}
}

// ---------- Stat Counter Animation ----------
function initStatCounters() {
	const statNumbers = document.querySelectorAll('.stat-number');
	if (!statNumbers.length) return;
	const counterObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const el = entry.target;
				const target = parseInt(el.getAttribute('data-target'), 10);
				if (isNaN(target) || target === 0 || el.dataset.counted) return;
				el.dataset.counted = 'true';
				let current = 0;
				const step = Math.max(1, Math.floor(target / 40));
				const timer = setInterval(() => {
					current += step;
					if (current >= target) {
						current = target;
						clearInterval(timer);
					}
					el.textContent = current + '+';
				}, 30);
				counterObserver.unobserve(el);
			}
		});
	}, { threshold: 0.5 });
	statNumbers.forEach(el => counterObserver.observe(el));
}

// ---------- About Section ----------
async function loadAboutData() {
	try {
		const doc = await db.collection('portfolio').doc('about').get();
		if (!doc.exists) return;
		const d = doc.data();

		const descEl = document.getElementById('about-description');
		if (descEl && d.description) {
			const paragraphs = d.description.split('\n').filter(p => p.trim());
			if (paragraphs.length > 1) {
				descEl.innerHTML = paragraphs.map(p => '<p>' + escapeHtml(p) + '</p>').join('');
			} else {
				descEl.innerHTML = '<p>' + escapeHtml(d.description) + '</p>';
			}
		}

		const imgEl = document.getElementById('about-photo');
		if (imgEl && d.photo) {
			imgEl.src = d.photo;
			imgEl.style.display = 'block';
		}

		// Update stat counters if provided
		if (d.stats && Array.isArray(d.stats)) {
			const statItems = document.querySelectorAll('.stat-item');
			d.stats.forEach((stat, i) => {
				if (statItems[i]) {
					const numEl = statItems[i].querySelector('.stat-number');
					const labelEl = statItems[i].querySelector('.stat-label');
					if (numEl && stat.value != null) numEl.setAttribute('data-target', stat.value);
					if (labelEl && stat.label) labelEl.textContent = stat.label;
				}
			});
		}

		// Start counter animation after data is loaded
		initStatCounters();
	} catch (err) {
		console.error('Error loading about:', err);
	}
}

// ---------- Services Section ----------
async function loadServicesData() {
	try {
		const snap = await db.collection('portfolio').doc('services').collection('items').orderBy('order').get();
		const container = document.getElementById('services-grid');
		if (!container || snap.empty) return;

		container.innerHTML = '';
		snap.forEach(doc => {
			const d = doc.data();
			const card = document.createElement('div');
			card.className = 'service-card';
			card.innerHTML = `
				<div class="service-icon">${d.icon || ''}</div>
				<h3>${escapeHtml(d.title)}</h3>
				<p>${escapeHtml(d.description)}</p>
			`;
			container.appendChild(card);
		});
	} catch (err) {
		console.error('Error loading services:', err);
	}
}

// ---------- Testimonials Section ----------
async function loadTestimonialsData() {
	try {
		const snap = await db.collection('portfolio').doc('testimonials').collection('items').orderBy('order').get();
		const container = document.getElementById('testimonials-grid');
		if (!container || snap.empty) return;

		container.innerHTML = '';
		snap.forEach(doc => {
			const d = doc.data();
			const card = document.createElement('div');
			card.className = 'testimonial-card';
			card.innerHTML = `
				<p>"${escapeHtml(d.quote)}"</p>
				<div class="testimonial-author">
					${d.avatar ? `<img src="${escapeHtml(d.avatar)}" alt="${escapeHtml(d.name)}" class="testimonial-avatar">` : '<div class="testimonial-avatar"></div>'}
					<div>
						<strong>${escapeHtml(d.name)}</strong>
						<span>${escapeHtml(d.role || '')}</span>
					</div>
				</div>
			`;
			container.appendChild(card);
		});
	} catch (err) {
		console.error('Error loading testimonials:', err);
	}
}