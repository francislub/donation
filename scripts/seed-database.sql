-- Create initial admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO Admin (id, email, password, name, role, isActive, createdAt, updatedAt) VALUES
('admin1', 'admin@charity.org', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMesJVe4JvVelMaBcvK5u9Ni5S', 'System Administrator', 'SUPER_ADMIN', true, NOW(), NOW());

-- Sample children data
INSERT INTO Child (id, name, age, class, bio, location, needs, photo, isActive, isSponsored, createdAt, updatedAt) VALUES
('child1', 'Maria Santos', 8, 'Grade 3', 'Maria loves to read and dreams of becoming a teacher. She lives with her grandmother and needs support for school supplies.', 'Manila, Philippines', ['School supplies', 'Uniform', 'Books'], 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', true, false, NOW(), NOW()),
('child2', 'John Doe', 10, 'Grade 5', 'John is passionate about mathematics and wants to become an engineer. He needs help with educational materials.', 'Nairobi, Kenya', ['School fees', 'Calculator', 'Textbooks'], 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', true, false, NOW(), NOW()),
('child3', 'Aisha Mohammed', 7, 'Grade 2', 'Aisha is a bright young girl who loves drawing. She needs basic school supplies and nutritional support.', 'Lagos, Nigeria', ['Art supplies', 'Nutrition', 'School bag'], 'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400', true, true, NOW(), NOW());

-- Sample sponsors data
INSERT INTO Sponsor (id, name, email, phone, address, isActive, isBlacklisted, createdAt, updatedAt) VALUES
('sponsor1', 'Robert Johnson', 'robert@email.com', '+1-555-0123', '123 Main St, New York, NY', true, false, NOW(), NOW()),
('sponsor2', 'Sarah Williams', 'sarah@email.com', '+1-555-0124', '456 Oak Ave, Los Angeles, CA', true, false, NOW(), NOW()),
('sponsor3', 'Michael Brown', 'michael@email.com', '+1-555-0125', '789 Pine St, Chicago, IL', true, false, NOW(), NOW());

-- Sample beneficiaries data
INSERT INTO Beneficiary (id, name, contact, details, photos, helpType, location, isActive, createdAt, updatedAt) VALUES
('beneficiary1', 'Santos Family', '+63-912-345-6789', 'Family of 5 affected by typhoon, needs temporary shelter and food assistance', ['https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400'], 'Emergency Relief', 'Cebu, Philippines', true, NOW(), NOW()),
('beneficiary2', 'Elderly Care Center', '+254-700-123-456', 'Local elderly care center needs medical supplies and food donations', ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'], 'Medical Support', 'Mombasa, Kenya', true, NOW(), NOW());

-- Sample donations data
INSERT INTO Donation (id, amount, method, status, date, description, reference, sponsorId, createdAt, updatedAt) VALUES
('donation1', 500.00, 'PAYPAL', 'COMPLETED', NOW(), 'Monthly sponsorship donation', 'PP-12345', 'sponsor1', NOW(), NOW()),
('donation2', 250.00, 'BANK_TRANSFER', 'COMPLETED', NOW(), 'One-time donation for school supplies', 'BT-67890', 'sponsor2', NOW(), NOW()),
('donation3', 1000.00, 'STRIPE', 'PENDING', NOW(), 'Annual donation', 'ST-11111', 'sponsor3', NOW(), NOW());

-- Sample sponsorship data
INSERT INTO Sponsorship (id, startDate, endDate, amount, isActive, childId, sponsorId, createdAt, updatedAt) VALUES
('sponsorship1', NOW(), NULL, 50.00, true, 'child3', 'sponsor1', NOW(), NOW());

-- Sample settings data
INSERT INTO Settings (id, key, value, description, updatedAt) VALUES
('setting1', 'organization_name', 'Hope Children Foundation', 'Name of the organization', NOW()),
('setting2', 'contact_email', 'contact@hopefoundation.org', 'Main contact email', NOW()),
('setting3', 'paypal_enabled', 'true', 'Enable PayPal payments', NOW()),
('setting4', 'stripe_enabled', 'false', 'Enable Stripe payments', NOW());
