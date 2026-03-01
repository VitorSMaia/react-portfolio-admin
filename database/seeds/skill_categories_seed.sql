-- Seed skill categories with multilingual descriptions
insert into public.skill_categories (key, label, icon, color, description_en, description_pt)
values 
('frontend', 'FRONTEND_TECH', 'data_object', 'text-accent-cyan', 
 'Reactive and high-fidelity interface development using Tailwind CSS, Alpine.js and Blade, with specialized Three.js implementations for data visualization.', 
 'Desenvolvimento de interfaces reativas e de alta fidelidade utilizando Tailwind CSS, Alpine.js e Blade, com implementações especializadas em Three.js para visualização de dados.'),
('backend', 'BACKEND_ARCH', 'dns', 'text-primary', 
 'Robust systems architecture with the Laravel ecosystem, Node.js microservices orchestration, and Python automations/scripts for data processing.', 
 'Arquitetura de sistemas robustos com ecossistema Laravel, orquestração de microsserviços em Node.js e automações/scripts em Python para processamento de dados.'),
('tools', 'DEVOPS_SEC', 'security', 'text-purple-500', 
 'Scalable infrastructure provisioning with Terraform and full CI/CD pipeline automation via GitHub Actions, for resilient and secure deployments.', 
 'Provisionamento de infraestrutura escalável com Terraform e automação completa de pipelines de CI/CD via GitHub Actions, para deploys resilientes e seguros.');
